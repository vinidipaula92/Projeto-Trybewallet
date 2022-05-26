import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { expenseAction, walletSuccess } from '../actions';
import '../css/Form.css';

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
  };

  handleRegister = () => {
    const { addExpense, expenses } = this.props;
    addExpense({ id: expenses.length, ...this.state });
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { method, tag, value, description, currency } = this.state;
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const despesa = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div className="container-form">
        <div className="form-container-input">
          <label htmlFor="value" className="label-form">
            Valor:
            <input
              type="text"
              data-testid="value-input"
              name="value"
              value={value}
              onChange={this.handleChange}
              className="input-form"
            />
          </label>
          <label htmlFor="description" className="label-form">
            Descricao:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              id="description"
              value={description}
              onChange={this.handleChange}
              className="input-form"
            />
          </label>
          <label htmlFor="currency" className="label-form">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={currency}
              required
              onChange={this.handleChange}
              className="input-form"
            >
              {currencies.map((coin, index) => (
                <option key={index}>{coin}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method" className="label-form">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={method}
              onChange={this.handleChange}
              className="input-form"
            >
              {pagamento.map((pay, index) => (
                <option key={index}>{pay}</option>
              ))}
            </select>
          </label>
          <label htmlFor="tag" className="label-form">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={tag}
              onChange={this.handleChange}
              className="input-form"
            >
              {despesa.map((expense, index) => (
                <option key={index}>{expense}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            data-testid="add-button"
            onClick={this.handleRegister}
            className="button-form"
          >
            Adicionar despesa
          </button>
        </div>
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
