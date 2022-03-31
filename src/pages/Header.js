import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{userName}</p>
          <span data-testid="total-field">0</span>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.email,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
