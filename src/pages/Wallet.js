import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { walletSuccess } from '../actions';
import Header from './Header';

class Wallet extends React.Component {
  componentDidMount() {
    // requisição da api
    const { getApi } = this.props;
    getApi();
  }

  render() {
    const { currencies } = this.props;
    const pagamento = [' ', 'Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const despesa = [' ', 'Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <Header />
        <label htmlFor="valor">
          Valor:
          <input type="text" data-testid="value-input" name="valor" id="valor" />
        </label>
        <label htmlFor="descricao">
          Descricao:
          <input
            type="text"
            data-testid="description-input"
            name="descricao"
            id="descricao"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select data-testid="currency-input" name="moeda" id="moeda">
            {
              currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{currency}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de pagamento:
          <select data-testid="method-input" name="pagamento" id="pagamento">
            {
              pagamento.map((pay, index) => (
                <option key={ index } value={ pay }>{pay}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="despesa">
          Categoria:
          <select data-testid="tag-input" name="despesa" id="despesa">
            {
              despesa.map((expense, index) => (
                <option key={ index } value={ expense }>{expense}</option>
              ))
            }
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(walletSuccess()),
});

Wallet.propTypes = {
  getApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
