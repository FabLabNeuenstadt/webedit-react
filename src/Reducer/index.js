import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const MAX_ANIMATIONS = 248;

export default handleActions({
  ADD_ANIMATION: (state, { payload }) => ({
    animations: state.animations.set(payload.id, payload),
  }),
  SELECT_ANIMATION: (state, { payload }) => ({
    selectedAnimation: payload,
  }),
  UPDATE_ANIMATION: (state, { payload }) => ({
    animations: state.animations.set(payload.id, payload),
  }),
}, {
  animations: Map(),
  selectedAnimation: undefined,
});
