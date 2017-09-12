import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AddBook extends Component {
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
            cover: 'hello.jpg',
            author: '',
            catId: 1,
            total: 1,
            prodYear: '',
            isLoading: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }
    onChange(event) {
        const name = event.target.name,
            value = event.target.value;
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onFocus(e) {
        const value = e.target.value,
            name = e.target.name;

        switch (name) {
            case 'title':
                this.setState({ titleError: '' })
                break;
            case 'author':
                this.setState({ authorError: '' })
                break;
            case 'prodYear':
                this.setState({ prodYearError: '' })
                break;
            case 'description':
                this.setState({ descError: '' })
                break;
            case 'isbn':
                this.setState({ isbnError: '' })
                break;
        }
    }

    onBlur(e) {
        const value = e.target.value,
            name = e.target.name;

        switch (name) {
            case 'title':
                if (value.length < 2 || !value) {
                    this.setState({ titleError: 'Book title must be greater than 2 characters' })
                    break;
                }
            case 'author':
                if (value.length < 2 || !value) {
                    this.setState({ authorError: 'Book author name must be greater than 2 characters' })
                    break;
                }
            case 'prodYear':
                if (value.length < 4 || !value) {
                    this.setState({ prodYearError: 'Production year is not valid' })
                    return false;
                    break;
                }
            case 'description':
                if (value.length < 5 || !value) {
                    this.setState({ descError: 'Book description is required' })
                    break;
                }
            case 'isbn':
                if (value.length < 5 || !value) {
                    this.setState({ isbnError: 'Book ISBN must be a minimum of 5 characters' })
                }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.onSubmit(this.state)
            .then((message) => {
                Materialize.toast('Book added Successfully', 2000, 'blue',
                    () => {
                        this.setState({ isLoading: false })
                    });
                window.location.href = '/admin';
            })
            .catch((err) => err)
    }

    render() {
        return (
            <div style={{ marginTop: 20, backgroundColor: '#fff', width: '70%', float: 'right', marginRight: 100 }}>
                <div className="row">
                    <form name="add_book" className="col s12" onSubmit={this.handleSubmit}>
                        <div className="add-book">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        className="validate"
                                        onChange={this.onChange}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        required />
                                    <label htmlFor="isbn">Title</label>
                                    <div style={{ color: 'red' }}>{this.state.titleError}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="author"
                                        type="text"
                                        name="author"
                                        className="validate"
                                        onChange={this.onChange}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        required />
                                    <label htmlFor="isbn">Author</label>
                                    <div style={{ color: 'red' }}>{this.state.authorError}</div>
                                </div>
                            </div>
                           
                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        id="total"
                                        name="total"
                                        type="number"
                                        className="validate"
                                        value="1"
                                        onChange={this.onChange}
                                        onFocus={this.onFocus}
                                        required />
                                    <label htmlFor="isbn">Total</label>
                                </div>
 
                                <div className="input-field col s6">
                                    <input
                                        id="prodYear"
                                        name="prodYear"
                                        type="number"
                                        className="validate"
                                        onChange={this.onChange}
                                        onBlur={this.onBlur}
                                        onFocus={this.onFocus}
                                        required />
                                    <label htmlFor="prodYear">Production Year</label>
                                    <div style={{ color: 'red' }}>{this.state.prodYearError}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="isbn"
                                        name="isbn"
                                        type="text"
                                        className="validate"
                                        onChange={this.onChange}
                                        onBlur={this.onBlur}
                                        onFocus={this.onFocus}
                                        required />
                                    <label htmlFor="isbn">ISBN</label>
                                    <div style={{ color: 'red' }}>{this.state.isbnError}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea
                                        id="description"
                                        className="materialize-textarea"
                                        name="description"
                                        onBlur={this.onBlur}
                                        onChange={this.onChange}
                                        onFocus={this.onFocus}
                                    ></textarea>
                                    <label htmlFor="description">Description</label>
                                    <div style={{ color: 'red' }}>{this.state.descError}</div>
                                </div>
                            </div>
                            <div className="file-field input-field">
                                <div style={{ backgroundColor: '#0000ff' }} className="btn">
                                    <span>Upload Cover</span>
                                    <input type="file" name="cover" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                        </div>
                        <button style={{
                            backgroundColor: '#0000ff',
                            color: '#fff', float: 'right'
                        }}
                            className="btn waves-effect waves-light"
                            type="submit" name="submit" disabled={this.state.isLoading}>Add Book
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
