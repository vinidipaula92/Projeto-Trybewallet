import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { expenseAction, walletSuccess } from '../actions';
import Table from './Table';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    // requisição da api
    const { getApi } = this.props;
    getApi();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleRegister = () => {
    const { addExpense, expenses } = this.props;
    addExpense({ id: expenses.length, ...this.state });
    this.setState({
      value: 0,
      description: '',
    });
  }

  render() {
    const { currencies } = this.props;
    const { method, tag, value, description, currency } = this.state;
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const despesa = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descricao:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            required
            onChange={ this.handleChange }
          >
            {
              currencies.map((coin, index) => (
                <option
                  key={ index }
                >
                  {coin}

                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {
              pagamento.map((pay, index) => (
                <option
                  key={ index }
                >
                  {pay}

                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {
              despesa.map((expense, index) => (
                <option
                  key={ index }
                >
                  {expense}

                </option>
              ))
            }
          </select>
        </label>
        <button
          type="button"
          data-testid="add-button"
          onClick={ this.handleRegister }
        >
          Adicionar despesa

        </button>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(walletSuccess()),
  addExpense: (value) => dispatch(expenseAction(value)),
});

Form.propTypes = {
  getApi: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
