import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth_actions';
import { bindActionCreators } from 'redux';
import HeaderSideBar from '../includes/header-side-bar';
import HistoryList from '../includes/history-list';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event) {

        event.preventDefault();

        this.props.actions.logout();

        this.context.router.push('/');

    }
    render() {
        const { username, fullname } = this.props.user;
        console.log(this.props.user)
        return (<div>
            <HeaderSideBar onClick={this.logout} fullName={fullname} username={username} />
            <HistoryList />
       </div> )
    }
}

Dashboard.PropTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        user: state.auth.user.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            logout
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)