import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../includes/Header';
import SideBar from '../includes/SideBar';
import { bindActionCreators } from 'redux';
import { editProfileAction } from '../../actions/AuthActions';
import DashboardFooter from '../includes/DashboardFooter';
import { checkUserExist, 
	checkEmailExist, reMap } from '../../utils/Validation';

export class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: this.props.user.fullname,
			email: this.props.user.email,
      edit: false,
      emailExist: '',
			profile: true
		};

		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.displayEdit = this.displayEdit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    
  }
  
	/**
   * Validates the user input
   * 
   * @param {Object} event 
   * @returns 
   * 
   * @memberOf Profile
   */
  onBlur(event) {
		const name = event.target.name;
		const	value = event.target.value;

		switch (name) {
      case 'fullName':
      const validator = /[A-Za-z]/g;
        if(!validator.test(value)){
          this.setState({
            fullnameError: 'Invalid input, only alphabets are allowed'
          })
          return false;
        }
        break;
      case 'email':
      const userId = this.props.user.userId || this.props.user.id;      
				checkEmailExist({ email: value, userId })
				.then((data) => {
					if (data.length > 1) {
            this.setState({ emailExist: data });
						return false;
					} else {
						return true;
					}
				});
				break;
		}
  }

  /**
   * 
   * 
   * @param {Object} event 
   * 
   * @memberOf Profile
   */
  onFocus(event) {
		const name = event.target.name;
		const	value = event.target.value;

		switch (name) {
      case 'fullName':
        this.setState({fullnameError: ''})
        break;
      case 'email':
      this.setState({emailExist: ''})
      break;
		}
  }
  
  
	/**
   * set user input to state
   * 
   * @param {any} event 
   * 
   * @memberOf Profile
   */
  onChange(event) {
		const name = event.target.name,
			value = event.target.value;
		this.setState({ [name]: value });
	}

	/**
   * Toggles page display
   * 
   * 
   * @memberOf Profile
   */
  displayEdit() {
		this.setState({ edit: true, profile: false });
	}

	/**
   * Submits user input
   * 
   * @param {any} event 
   * 
   * @memberOf Profile
   */
  handleSubmit(event) {
		event.preventDefault();
		this.props.actions.editProfileAction(this.props.user.userId, this.state);
	}

	/**
   * Renders the component
   * 
   * @returns {Object}
   * 
   * @memberOf Profile
   */
  render() {
		const { username, fullname, id, email, plan } = this.props.user;
		return (
			<div className="row">
				<Header />
				<SideBar fullname={fullname} isAdmin={this.props.user.isAdmin} />
				<div id="edit">
					<div
						id="profile_edit"
						style={{
							backgroundColor: '#fff'
						}}
						className="row modal"
					>
						<h4
							style={{
								alignContent: 'center',
								marginLeft: '20px'
							}}
						>
							Edit Profile
						</h4>
						<div className="modal-content">
							<form name="edit_profile" onSubmit={this.handleSubmit}>
								<div className="edit-profile">
									<div className="row">
										<div className="input-field col s12">
											<b>Username</b>
											<input
												id="email"
												type="text"
												name="email"
												className="validate"
												defaultValue={username}
												disabled
											/>
										</div>
									</div>
									<div className="row">
										<div className="input-field col s12">
											<b>Full Name</b>
											<input
												id="fullName"
												type="text"
												name="fullName"
                        onBlur={this.onBlur}                                                
												onChange={this.onChange}
                        onFocus={this.onFocus}
												defaultValue={fullname}
												className="validate"
												required
											/>
                <div className="red-text">{this.state.fullnameError}</div>                                          
										</div>
									</div>
									<div className="row">
										<div className="input-field col s12">
											<b>Email Address</b>
											<input
												id="email"
												type="text"
												name="email"
												className="validate"
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}                
												defaultValue={email}
												onChange={this.onChange}
												required
											/>
                    <div className="red-text">{this.state.emailExist}</div>                      
										</div>
									</div>
								</div>
								<button
									style={{
										backgroundColor: 'rgb(21, 179, 157)',
										color: '#fff',
										float: 'right'
									}}
									className="btn waves-effect"
									type="submit"
									name="submit"
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
				{this.state.profile && (
					<div className="row">
						<div className="col s12 l9 push-l3">
							<div className="user-profile">
								<img
									className="avatar"
									src="https://images.vexels.com/media/users/3/130527/isolated/preview/845f79841ea58765d623a68bf434d5ed-girl-cartoon-head-character-by-vexels.png"
									alt="Ash"
								/>
								<div className="username">{fullname}</div>
								<div className="bio">Library User</div>
								<div className="row">
									<div className="col s12 m3 l12">
										<div className="description">
											<div className="horizontal">
												<div className="card-stacked">
													<div className="card-content">
														<p>
															<b>Full name: &nbsp;</b> &nbsp;
															{fullname}
														</p>
														<div className="divider" />
														<p>
															<b>Username: &nbsp;</b>
															{username}
														</p>
														<div className="divider" />
														<p>
															<b>Email: &nbsp;</b>
															{email}
														</p>
														<div className="divider" />
														<p>
															<b>Last seen: &nbsp;</b>
															Now
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<ul className="data">
									<li className="right-align">
										<a className="btn modal-trigger" href="#profile_edit">
											Edit Profile
										</a>
									</li>
									<li className="right-align">
										<Link className="waves-effect waves-light btn" 
                    to="/rented-books">
											Rented Books
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
				<DashboardFooter />
			</div>
		);
	}
}

/**
 * 
 * Maps the state to component Props
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				editProfileAction
			},
			dispatch
		)
	};
}

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 */
function mapStateToProps(state) {
	return { user: state.auth.user.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
