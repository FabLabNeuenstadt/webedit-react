/* eslint no-bitwise: 0 */
/* eslint-disable */
import _ from 'lodash';
import { List, Map } from 'immutable';

const STARTCODE = 0x99;
const PATTERNCODE = 0xA9;
const ENDCODE = 0x84;

const HI = 1;
const LOW = -1;

const sync = [
  _.range(17).map(() => LOW),
  _.range(17).map(() => HI),
];
const bits = [
  [
    _.range(3).map(() => LOW),
    _.range(5).map(() => LOW),
  ], [
    _.range(3).map(() => HI),
    _.range(5).map(() => HI),
  ],
];

const supportedFrequencies = [16000, 22050, 24000, 32000, 44100, 48000];

const _hammingCalculateParityLowNibble = [0, 3, 5, 6, 6, 5, 3, 0, 7, 4, 2, 1, 1, 2, 4, 7];
const _hammingCalculateParityHighNibble = [0, 9, 10, 3, 11, 2, 1, 8, 12, 5, 6, 15, 7, 14, 13, 4];

export default class Modem {
  hilo: 0|1 = 0;
  data: number[];
  rawData: List<Animation>;
  constructor() {
    this.setData(Map({
      '': {
        text: 'Foobar',
        name: 'test',
        speed: 1,
        direction: 0,
        delay: 0,
      },
    }));
  }
  _generateSync(): number {
    this.hilo ^= 1;
    return sync[this.hilo];
  }
  generateSyncSignal(number: number = 1): number[] {
    return _.flatten(_.range(number).map(() => this._generateSync()));
  }

  _textFrameHeader(animation: Animation): number[] {
    return [0x01 << 4 | animation.text.length >> 8, animation.text.length & 0xFF];
  }

  _textHeader(animation: Animation): number[] {
    return [animation.speed << 4 | animation.delay, animation.direction << 4 | 0x00];
  }

  setData(animations: Map<string, Animation>) {
    const data = _.flatten(animations.toList().map(animation => {
      let d = [PATTERNCODE, PATTERNCODE];
      d = d.concat(this._textFrameHeader(animation));
      d = d.concat(this._textHeader(animation));
      d = d.concat(_.map(animation.text, char => char.charCodeAt(0)));
      return d;
      // return _.map(animation.text, char => char.charCodeAt(0));
    }).toArray());
    this.data = [STARTCODE, STARTCODE, ...data, ENDCODE, ENDCODE];
  }

  modemCode(rawByte: number): number[] {
    let byte = rawByte;
    return _.flatten(_.range(8).map(() => {
      this.hilo ^= 1;
      const resultByte = bits[this.hilo][byte & 0x01];
      byte >>= 1;
      return resultByte;
    }));
  }

  _hamming128(byte: number): number {
    return _hammingCalculateParityLowNibble[byte & 0x0F] ^ _hammingCalculateParityHighNibble[byte >> 4];
  }

  _hamming2416(first: number, second: number): number {
    return this._hamming128(second) << 4 | this._hamming128(first);
  }

  hamming(first: number, second: number): number {
    return this._hamming2416(first, second);
  }

  generateAudio(): Float32Array {
    if (this.data.length % 2 !== 0) {
      this.data.push(0);
    }
    this.data = _.flatten(_.range(0, this.data.length, 2).map(index => {
      const first = this.data[index];
      const second = this.data[index + 1];
      return [first, second, this.data[index + 2] || 0, this.hamming(first, second)];
    }));

    let sound = this.generateSyncSignal(1200);
    // let sound = [];
    let count = 0;
    this.data.forEach(byte => {
      sound = sound.concat(this.modemCode(byte));
      count += 1;
      if (count === 9) {
        sound = sound.concat(this.generateSyncSignal(4));
        count = 0;
      }
    });
    sound = sound.concat(this.generateSyncSignal(4));
    return Float32Array.from(_.flatten(sound));
  }
}

const x = new Modem();
const data = x.generateAudio();
console.log(JSON.stringify(Array.from(data)));
const audioCtx = new AudioContext();
const buffer = audioCtx.createBuffer(1, data.length, 48000);
buffer.copyToChannel(data, 0);

const source = audioCtx.createBufferSource();
source.buffer = buffer;
source.connect(audioCtx.destination);

source.start();
