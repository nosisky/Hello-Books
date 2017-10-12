import React, { Component } from 'react';  
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import jwt from 'jsonwebtoken';

import { logout } from '../../actions/auth_actions';


export default function(ComposedComponent) {  

  class AdminAuthentication extends Component {

    componentWillMount() {
        
        const key = 'Andelahellobooks';

        const token = localStorage.getItem('token');
        if (token) {
          jwt.verify(token, key, (error) => {
            if (error) {
              this.props.actions.logout();
              this.props.history.push('/');
            }
          });
        }
        if (!this.props.authenticated) {
            this.props.history.push('/');
        }

      if(this.props.user.isAdmin !== 1) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if(nextProps.currentUser.isAdmin !== 1) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  AdminAuthentication.PropTypes = {
    router: PropTypes.object
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        logout,
      }, dispatch)
    };
  }

   function mapStateToProps(state) {
    return { 
      authenticated: state.auth.authenticated,
      user: state.auth.user.currentUser
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(AdminAuthentication);
}