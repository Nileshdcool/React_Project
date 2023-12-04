import {
  CHANGE_VIEW,
} from '../constants/actionCreators';

const INITIAL_STATE = {
  view: 'planner',
};
export const changeViewStore = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        view: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};
