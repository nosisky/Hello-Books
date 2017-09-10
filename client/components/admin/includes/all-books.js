import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AllBooks extends Component {
    render() {
        return (
                <div className="col s12 m3 l3">
                    <div className="card">
                        <div className="card-image">
                            <img src="http://www.bookcovercafe.com/wp-content/uploads/book-cover-cafe-self-publish-the-smart-way-8.png" />
                            <span className="card-title">{this.props.title}</span>
                        </div>
                        <div className="card-content">
                            <p>{this.props.description}</p>
                        </div>
                        <div className="card-action">
                            <button style={{ float: 'left', height: 28, color:'#fff', backgroundColor: 'red'}}>Delete</button>
                            <button style={{ float: 'right', height: 28, color: '#fff', backgroundColor: 'green' }}>Edit</button>
                        </div>
                    </div>
            </div>
        )
    }
}
