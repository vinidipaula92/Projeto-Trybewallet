// Coloque aqui suas actions
import getApi from '../store/api';

export const login = (value) => ({ type: 'LOGIN', value });

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY_SUCESS = 'RECEIVE_CURRENCY_SUCESS';
export const RECEIVE_CURRENCY_FAILURE = 'RECEIVE_CURRENCY_FAILURE';

export const requestCurrency = () => ({ type: REQUEST_CURRENCY });

export const receiveCurrencySuccess = (value) => ({
  type: RECEIVE_CURRENCY_SUCESS,
  currencies: Object.keys(value),
});

export const receiveCurrencyFailure = (error) => ({
  type: RECEIVE_CURRENCY_FAILURE,
  error,
});

export function walletSuccess() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    try {
      const response = await getApi();
      dispatch(receiveCurrencySuccess(response));
    } catch (error) {
      dispatch(receiveCurrencyFailure(error));
    }
  };
}

export const receiveExpenseSuccess = (value) => ({
  type: 'RECEIVE_EXPENSE_SUCCESS',
  ...value,
  expense: value,
});

export function expenseAction(state) {
  return async (dispatch) => {
    dispatch(requestCurrency());
    try {
      const response = await getApi();
      dispatch(receiveExpenseSuccess({ ...state, exchangeRates: response }));
    } catch (error) {
      dispatch(receiveCurrencyFailure(error));
    }
  };
}

export const deleteExpense = (id) => ({ type: 'DELETE_EXPENSE', id });

export const editExpense = (id) => ({ type: 'EDIT_EXPENSE', id });
