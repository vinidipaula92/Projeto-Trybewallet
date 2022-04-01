import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, walletSuccess } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
    };
  }

  handleDisable = () => {
    const { email, senha } = this.state;
    const seis = 6;
    if (!email.includes('.com' || '@') || senha.length < seis) {
      return true;
    }
    return false;
  }

  render() {
    const { loginSucess } = this.props;
    const { email, senha } = this.state;
    return (
      <div>
        <h1>Trybe Wallet - Login</h1>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ (e) => this.setState({ email: e.target.value }) }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ (e) => this.setState({ senha: e.target.value }) }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ this.handleDisable() }
            onClick={ () => loginSucess(email, senha) }
          >
            Entrar

          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginSucess: (email) => dispatch(login(email)),
  getApi: () => dispatch(walletSuccess()),
});

Login.propTypes = {
  loginSucess: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
