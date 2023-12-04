import {
  RESET_SIGNALS,
  SET_OPERATOR_SIGNALS,
  UPDATE_OPERATOR_SIGNALS,
} from '../constants/actionCreators';

const INITIAL_STATE = {
  operatorAlertSignals: [],
};
export const alertSignalsData = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_OPERATOR_SIGNALS:
      return {
        ...state,
        operatorAlertSignals: [...state.operatorAlertSignals, ...action.payload],
      };
    case UPDATE_OPERATOR_SIGNALS:
      return {
        ...state,
        operatorAlertSignals: action.payload,
      };
    case RESET_SIGNALS:
      return {
        ...state,
        operatorAlertSignals: [],
      };
    default:
      return state;
  }
};
