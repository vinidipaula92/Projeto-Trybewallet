import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { allExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            allExpenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>
                  {
                    expense.value.length === 2 ? `${expense.value}.00` : expense.value
                  }
                </td>
                <td>
                  {expense.exchangeRates[expense.currency].name.split('/')[0]}
                </td>
                <td>
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  {(expense.exchangeRates[expense.currency]
                    .ask * expense.value).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button data-testid="delete-btn" type="button">Editar</button>
                </td>
                <td>
                  <button data-testid="edit-btn" type="button">Excluir</button>
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

Table.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
