import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/index';
import '../css/Table.css';

class Table extends Component {
  render() {
    const { allExpenses, deleteIndex } = this.props;
    return (
      <table>
        <thead>
          <tr className="table-container">
            <th className="table-name">Descrição</th>
            <th className="table-name">Tag</th>
            <th className="table-name">Método de pagamento</th>
            <th className="table-name">Valor</th>
            <th className="table-name">Moeda</th>
            <th className="table-name">Câmbio utilizado</th>
            <th className="table-name">Valor convertido</th>
            <th className="table-name">Moeda de conversão</th>
            <th className="table-name">Editar/Excluir</th>
          </tr>
          {
            allExpenses.map((expense) => (
              <tr key={ expense.id } className="table-container">
                <td className="description">{expense.description}</td>
                <td className="tag">{expense.tag}</td>
                <td className="method">{expense.method}</td>
                <td className="value">
                  {
                    expense.value.length > 0 ? `${expense.value}.00` : expense.value
                  }
                </td>
                <td className="currency">
                  {expense.exchangeRates[expense.currency].name.split('/')[0]}
                </td>
                <td className="currency">
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td className="currency">
                  {(expense.exchangeRates[expense.currency]
                    .ask * expense.value).toFixed(2)}
                </td>
                <td className="real">
                  Real
                </td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    className="edit-btn"
                  >
                    Editar despesa

                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => deleteIndex(expense.id) }
                    className="delete-btn"
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))
          }
        </thead>
      </table>
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
