import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getCategoryAction } from '../../../actions/BookActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addBookAction } from '../../../actions/BookActions';
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';

/**
 * @description - Add book component
 * 
 * @export
 * 
 * @class AddBook
 * 
 * @extends {Component}
 */
export class AddBookModal extends Component {

	/**
	 * @description - Creates an instance of AddBook.
	 * 
	 * @param {Object} props - Componnet props data
	 * 
	 * @memberOf AddBook
	 */
	constructor(props) {
		super(props);
		this.state = {
			titleError: '',
			authorError: '',
			prodYearError: '',
			isbnError: '',
			descError: '',
			title: '',
			isbn: '',
			description: '',
			cover: 'https://firebasestorage.googleapis.com/v0/b/hellobooks-178515.appspot.com/o/images%2F3dadbd2a-dc4c-43b7-895c-5cb43bd32575.jpg?alt=media&token=b90d6a2a-3264-4772-b79f-4a4d7cebf2c2',
			author: '',
			catId: '',
			total: 5,
			prodYear: '',
			isLoading: '',
			isUploading: '',
			progress: 0
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderCategory = this.renderCategory.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
		this.handleProgress = this.handleProgress.bind(this);
		this.handleUploadStart = this.handleUploadStart.bind(this);
		this.handleUploadError = this.handleUploadError.bind(this);
	}

	/**
	 * @description - Starts the book cover upload
	 * 
	 * @memberOf AddBook
	 */
	handleUploadStart() {
		this.setState({ isUploading: true, progress: 0 });
	}

	/**
	 * 
	 * @description - Displays progress of book upload
	 * 
	 * @param {Object} progress 
	 * 
	 * @memberOf AddBook
	 */
	handleProgress(progress) {
		this.setState({ progress });
	}

	/**
	 * 
	 * @description - Displays error if any during file upload
	 * 
	 * @param {Object} error when book upload fails
	 * 
	 * @memberOf AddBook
	 */
	handleUploadError(error) {
		this.setState({ isUploading: false });
	}

	/**
	 * 
	 * @description - Completes the file upload and set the state to cover url
	 * 
	 * @param {String} filename - Link to uploaded file
	 * 
	 * @memberOf AddBook
	 */
	handleUploadSuccess(filename) {
		firebase.storage().ref('images').child(filename).getDownloadURL()
		.then((url) => {
			this.setState({ cover: url, progress: 100 });
		});
	}

	/**
	 * 
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf AddBook
	 */
	componentDidMount() {
		this.props.actions.getCategoryAction();
	}

	/**
	 * @description - Executes when text is typed in input box
	 * 
	 * @param {Object} event - Object
	 * 
	 * @memberOf AddBook
	 */
	onChange(event) {
		const name = event.target.name;
		const	value = event.target.value;
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	/**
	 * 
	 * @description - Clear off error messgae from local state
	 * 
	 * @param {Object} event - Object
	 * 
	 * @memberOf AddBook
	 */
	onFocus(event) {
		const value = event.target.value;
		const	name = event.target.name;

		switch (name) {
			case 'title':
				this.setState({ titleError: '' });
				break;
			case 'author':
				this.setState({ authorError: '' });
				break;
			case 'prodYear':
				this.setState({ prodYearError: '' });
				break;
			case 'description':
				this.setState({ descError: '' });
				break;
			case 'isbn':
				this.setState({ isbnError: '' });
				break;
		}
	}

	/**
	 * 
	 * @description - Validates user inputs and sets appropriate error message
	 * 
	 * @param {Object} event - Object
	 * 
	 * @returns 
	 * 
	 * @memberOf AddBook
	 */
	onBlur(event) {
		const value = event.target.value;
		const	name = event.target.name;

		switch (name) {
			case 'title':
				if (value.length < 5 || !value) {
					this.setState({ 
						titleError: 'Book title must be greater than 5 characters' });
					break;
				}

			case 'author':
				if (value.length < 2 || !value) {
					this.setState({ 
						authorError: 'Book author name must be greater than 2 characters' });
					break;
				}
			case 'prodYear':
				if (value.length < 4 || !value) {
					this.setState({ prodYearError: 'Production year is not valid' });
					return false;
					break;
				}
			case 'description':
				if (value.length < 5 || !value) {
					this.setState({ descError: 'Book description is required' });
					break;
				}
			case 'isbn':
				if (value.length < 5 || !value) {
					this.setState({ 
						isbnError: 'Book ISBN must be a minimum of 5 characters' });
					break;
				}
		}
	}

	/**
	 * 
	 * @description - Displays the list of category
	 * 
	 * @returns {Array} - Array of category
	 * 
	 * @memberOf AddBook
	 */
	renderCategory() {
		let allCategory = [];
		const category = this.props.category;
		if (!category || category.length < 1) {
			return '...loading';
		}
		category.map((cat) => {
			allCategory.push(
				<option key={cat.id} value={cat.id}>
					{cat.name}
				</option>
			);
		});
		return allCategory;
	}

	/**
	 * @description - Submit user input
	 * 
	 * @param {Object} event - Submits the form
	 * 
	 * @returns 
	 * 
	 * @memberOf AddBook
	 */
	handleSubmit(event) {
		event.preventDefault();
		this.props.actions.addBookAction(this.state)
			this.props.apiStatus && this.setState({
				isUploading: false,
				progress: 0
		})
	}

	/**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf AddBook
	 */
	render() {
		return (
			<div
			id="addBook"
			className="modal"
				style={{
					marginTop: 20,
					backgroundColor: '#fff',
				}}
			>
				<div className="modal-content">
				<h4 className="center-align">
								Add Book
				</h4>
					<form name="add_book"
					id="book_form"
					onSubmit={this.handleSubmit}>
						<div className="add-book">
							<div className="row">
								<div className="input-field col s6">
									<input
										id="title"
										type="text"
										name="title"
										className="validate"
										onChange={this.onChange}
										onFocus={this.onFocus}
										onBlur={this.onBlur}
										required
									/>
									<label htmlFor="isbn">Title</label>
									<div className="red-text">{this.state.titleError}</div>
								</div>
								<div className="input-field col s6">
									<input
										id="author"
										type="text"
										name="author"
										className="validate"
										onChange={this.onChange}
										onFocus={this.onFocus}
										onBlur={this.onBlur}
										required
									/>
									<label htmlFor="isbn">Author</label>
									<div className="red-text">{this.state.authorError}</div>
								</div>
							</div>

							<div className="row">
								<div className="input-field col s6">
									<input
										id="total"
										name="total"
										type="number"
										className="validate"
										defaultValue="1"
										min="1" 
										onChange={this.onChange}
										onFocus={this.onFocus}
										required
									/>
									<label htmlFor="isbn">Total</label>
								</div>

								<div className="input-field col s6">
									<input
										id="prodYear"
										name="prodYear"
										type="number"
										min="1000"
										className="validate"
										onChange={this.onChange}
										onBlur={this.onBlur}
										onFocus={this.onFocus}
										required
									/>
									<label htmlFor="prodYear">Production Year</label>
									<div className="red-text">{this.state.prodYearError}</div>
								</div>
							</div>
							<div className="row">
								<div className="col s6">
									<select
										id="catId"
										name="catId"
										onChange={this.onChange}
										className="browser-default"
									>
										<option value="">Select Category</option>
										{this.renderCategory()}
									</select>
								</div>
								<div className="input-field col s6">
									<input
										id="isbn"
										name="isbn"
										type="text"
										className="validate"
										onChange={this.onChange}
										onBlur={this.onBlur}
										onFocus={this.onFocus}
										required
									/>
									<label htmlFor="isbn">ISBN</label>
									<div className="red-text">{this.state.isbnError}</div>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12 textarea">
									<textarea
										id="description"
										className="materialize-textarea"
										name="description"
										onBlur={this.onBlur}
										onChange={this.onChange}
										onFocus={this.onFocus}
									/>
									<label htmlFor="description">Description</label>
									<div className="red-text">{this.state.descError}</div>
								</div>
							</div>
							<span>Upload Cover (Default cover will be used if omitted)</span>
							<br />
							<br />
							{this.state.isUploading &&
							this.state.progress < 100 && (
								<div>
									{' '}
									<div className="preloader-wrapper big active">
										<div className="spinner-layer spinner-blue-only">
											<div className="circle-clipper left">
												<div className="circle" />
											</div>
											<div className="gap-patch">
												<div className="circle" />
											</div>
											<div className="circle-clipper right">
												<div className="circle" />
											</div>
										</div>
									</div>{' '}
									<br />
									<br />{' '}
								</div>
							)}
							{this.state.progress === 100 && this.state.cover.length > 1 && (
								<div id="image_uploaded">
									<img
										height="50px"
										id="completed"
										width="50px"
										alt="check mark"
										src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-128.png"
									/>
									<br />
								</div>
							)}
							<ImageUploader
								name="cover"
								storageRef={this.props.firebaseStorage}
								onProgress={this.handleProgress}
								onUploadSuccess={this.handleUploadSuccess}
								onUploadStart={this.handleUploadStart}
							/>
						</div>
						<button
							id="addIt"
							style={{
								backgroundColor: 'rgb(37, 76, 71)',
								color: '#fff',
								float: 'right'
							}}
							className="btn waves-effect"
							type="submit"
							name="submit"
							disabled={this.state.apiStatus}
						>
							Add Book
						</button>
					</form>
				</div>
			</div>
		);
	}
}

/**
 * 
 * @description - Maps the dispatch to component props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
export function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				getCategoryAction,
				addBookAction
			},
			dispatch
		)
	};
}

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
export function mapStateToProps(state) {
	return { 
		category: state.book.category,
		apiStatus: state.apiStatus
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
