import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/AuthActions';

export default function ( ComposedComponent ) {
  class Authentication extends Component {

    componentWillMount() {
      const key = 'Andelahellobooks';
      const token = localStorage.getItem( 'token' );
      if ( token ) {
        jwt.verify( token, key, ( error ) => {
          if ( error ) {
            this
              .props
              .actions
              .logout();
            this
              .props
              .history
              .push( '/' );
          }
        } );
      }
      if ( !this.props.authenticated ) {
        this
          .props
          .history
          .push( '/' );
      }
      if ( !this.props.authenticated ) {
        this
          .props
          .history
          .push( '/' );
      }
    }

    componentWillUpdate( nextProps ) {
      if ( !nextProps.authenticated ) {
        this
          .props
          .history
          .push( '/' );
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapDispatchToProps( dispatch ) {
    return {
      actions: bindActionCreators( {
        logout
      }, dispatch )
    };
  }

  Authentication.PropTypes = {
    router: PropTypes.object
  }

  function mapStateToProps( state ) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
  }

  return connect( mapStateToProps, mapDispatchToProps )( Authentication );
}
