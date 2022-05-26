import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/index';
import '../css/Table.css';

class Table extends Component {
  render() {
    const { allExpenses, deleteIndex } = this.props;
    return (
      <div className="m-auto">
        <h3 className="m-auto title">Tabela de despesas</h3>
        <div className="table-responsive table-container col-12 m-auto">
          <table className="content-table table align-middle table-css">
            <thead>
              <tr className="align-middle table-title">
                <th scope="col">Descrição</th>
                <th scope="col">Tag</th>
                <th scope="col">Método de pagamento</th>
                <th scope="col">Valor</th>
                <th scope="col">Moeda</th>
                <th scope="col">Câmbio utilizado</th>
                <th scope="col">Valor convertido</th>
                <th scope="col">Moeda de conversão</th>
                <th scope="col">Excluir</th>
              </tr>
            </thead>
            <tbody className="align-middle table-body">
              {allExpenses.map((expense) => (
                <tr key={expense.id} className="active-row">
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>
                    {expense.value.length > 0
                      ? `${expense.value}.00`
                      : expense.value}
                  </td>
                  <td>
                    {expense.exchangeRates[expense.currency].name.split('/')[0]}
                  </td>
                  <td>
                    {Number(
                      expense.exchangeRates[expense.currency].ask,
                    ).toFixed(2)}
                  </td>
                  <td>
                    {(
                      expense.exchangeRates[expense.currency].ask *
                      expense.value
                    ).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={() => deleteIndex(expense.id)}
                      className="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteIndex: (id) => dispatch(deleteExpense(id)),
});

Table.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteIndex: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
