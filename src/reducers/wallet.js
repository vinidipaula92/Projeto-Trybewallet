// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCY_FAILURE, RECEIVE_CURRENCY_SUCESS } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case RECEIVE_CURRENCY_SUCESS:
    return {
      ...state,
      currencies: action.currencies.filter((element) => element !== 'USDT'),
    };
  case RECEIVE_CURRENCY_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
}

export default wallet;
