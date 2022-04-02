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
            <th>Descricao</th>
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
                    expense.value.length === 2 ? expense
                      .value.replace('.', ',') : expense.value
                  }
                </td>
                <td>{expense.currency}</td>
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
