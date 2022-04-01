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
    console.log(this.props);
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(walletSuccess()),
});

Wallet.propTypes = {
  getApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
