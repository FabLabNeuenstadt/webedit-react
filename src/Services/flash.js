// @flow
import type { Map } from 'immutable';
import Modem from './modem';

export function transfer(animations: Map<string, Animation>) {
  const modem = new Modem(animations.filter(a => a.text));
  const data = modem.generateAudio();
  const audioCtx = new AudioContext();
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 1;
  gainNode.connect(audioCtx.destination);
  const buffer = audioCtx.createBuffer(1, data.length, 48000);
  buffer.copyToChannel(data, 0);
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
  setTimeout(() => audioCtx.close(), 1000);
}
