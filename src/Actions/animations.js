/* @flow */
import { createAction } from 'redux-actions';
import UUID from 'uuid-js';
import { t } from 'i18next';

export const addNewAnimation = createAction('ADD_ANIMATION', (type: string) => ({
  delay: 0,
  direction: 0,
  id: UUID.create().toString(),
  name: t('animation.new'),
  speed: 13,
  type,
}));

export const selectAnimation = createAction('SELECT_ANIMATION', (animation: Animation) => animation);

export const updateAnimation = createAction('UPDATE_ANIMATION', (animation: Animation) => animation);

export const removeAnimation = createAction('REMOVE_ANIMATION', (animationId: string) => animationId);

export const reset = createAction('RESET');
