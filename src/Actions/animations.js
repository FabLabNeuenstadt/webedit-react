/* @flow */
import { createAction } from 'redux-actions';
import UUID from 'uuid-js';

export const addNewAnimation = createAction('ADD_ANIMATION', (type: string) => ({
  id: UUID.create().toString(),
  name: 'new Animation',
  type,
}));

export const selectAnimation = createAction('SELECT_ANIMATION', ((animation: Animation) => animation));

export const updateAnimation = createAction('UPDATE_ANIMATION', ((animation: Animation) => animation));
