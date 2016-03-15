import Modem from './modem';

function flashAnimation(animation: Animation) {

}

export function transfer(animations: Map<string, Animation>) {
  animations.forEach(animation => {
    flashAnimation(animation);
  });
}
