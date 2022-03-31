// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  curriencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case 'CARTEIRA':
    return {
      ...state,
      curriencies: action.value,
    };
  default:
    return state;
  }
}

export default wallet;
