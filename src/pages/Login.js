import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, walletSuccess } from '../actions/index';
import '../css/Login.css';

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
      <div className="container-login">
        <h1 className="title-login">Welcome to the Trybe Wallet</h1>
        <h2 className="title-login">Faça seu login</h2>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ (e) => this.setState({ email: e.target.value }) }
          className="input-login"
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ (e) => this.setState({ senha: e.target.value }) }
          className="input-login"
        />
        <Link to="/carteira" style={ { textDecoration: 'none' } }>
          <button
            type="button"
            disabled={ this.handleDisable() }
            onClick={ () => loginSucess(email, senha) }
            className="button-login"
            style={ this
              .handleDisable()
              ? { backgroundColor: '#ccc' } : { backgroundColor: '#305cec' } }
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
