import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { walletSuccess } from '../actions/index';
import '../css/Header.css';

class Header extends React.Component {
  render() {
    const { userName, getExpenses } = this.props;

    const saveExpenses = getExpenses.map((element) => {
      const { value, currency, exchangeRates } = element;
      const cotacao = exchangeRates[currency].ask;
      const valor = value * cotacao;
      return valor;
    });
    const total = saveExpenses.reduce((acc, curr) => acc + curr, 0);
    return (
      <div>
        <header className="header-container">
          <p data-testid="email-field" className="username">{userName}</p>
          <span data-testid="total-field" className="price">{total.toFixed(2)}</span>
          <p data-testid="header-currency-field" className="moeda">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.email,
  walletName: state.wallet.curriencies,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(walletSuccess()),
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
