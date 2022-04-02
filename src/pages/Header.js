import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { walletSuccess } from '../actions/index';

class Header extends React.Component {
  render() {
    const { userName, getExpenses } = this.props;
    // console.log(getExpenses);

    const saveExpenses = getExpenses.map((element) => {
      // console.log(element);
      const { value, currency, exchangeRates } = element;
      const cotacao = exchangeRates[currency].ask;
      // console.log(cotacao);
      const valor = value * cotacao;
      return valor;
    });
    const total = saveExpenses.reduce((acc, curr) => acc + curr, 0);
    // console.log(total);
    return (
      <div>
        <header>
          <p data-testid="email-field">{userName}</p>
          <span data-testid="total-field">{total.toFixed(2)}</span>
          <p data-testid="header-currency-field">BRL</p>
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
