import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AllBooks extends Component {
    render() {
        return (<div className="admin-book-list">
            <div className="card-panel teal book-header"><center>Recently Added Books</center></div>
            <div className="row">
                <div className="col s12 m3 l3">
                    <div className="card">
                        <div className="card-image">
                            <img src="http://www.bookcovercafe.com/wp-content/uploads/book-cover-cafe-self-publish-the-smart-way-8.png" />
                            <span className="card-title">Think rich to grow rich</span>
                        </div>
                        <div className="card-content">
                            <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <a style={{ float: 'left', height: 28, color: 'red', border: '2px solid black', paddingBottom: 5 }} href="#"><i className="material-icons">delete</i></a>
                            <a style={{ float: 'right', height: 28, color: 'green', border: '2px solid black', }} href="#"><i className="material-icons">edit</i></a>
                            <a style={{ float: 'right', height: 28, color: 'green', border: '2px solid black', }} href="#"><i className="material-icons">remove_red_eye</i></a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m3 l3">
                    <div className="card">
                        <div className="card-image">
                            <img src="http://www.bookcovercafe.com/wp-content/uploads/book-cover-cafe-self-publish-the-smart-way-8.png" />
                            <span className="card-title">Think rich to grow rich</span>
                        </div>
                        <div className="card-content">
                            <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <a style={{ float: 'left', height: 28, color: 'red', border: '2px solid black', }} href="#"><i className="material-icons">delete</i></a>
                            <a style={{ float: 'right', height: 28, color: 'green', border: '2px solid black', }} href="#"><i className="material-icons">edit</i></a>
                            <a style={{ float: 'right', height: 28, color: 'green', border: '2px solid black', }} href="#"><i className="material-icons">remove_red_eye</i></a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m3 l3">
                    <div className="card">
                        <div className="card-image">
                            <img src="http://www.bookcovercafe.com/wp-content/uploads/book-cover-cafe-self-publish-the-smart-way-8.png" />
                            <span className="card-title">Think rich to grow rich</span>
                        </div>
                        <div className="card-content">
                            <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <a style={{ float: 'left', height: 28, color: 'red', border: '2px solid black', }} href="#"><i className="material-icons">delete</i></a>
                            <a style={{ float: 'right', height: 28, color: 'green', border: '2px solid black', }} href="#"><i className="material-icons">edit</i></a>
                            <a style={{ float: 'right', height: 28, color: 'green', border: '2px solid black', }} href="#"><i className="material-icons">remove_red_eye</i></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m3 l3">
                        <div className="card">
                            <div className="card-image">
                                <img src="http://www.bookcovercafe.com/wp-content/uploads/book-cover-cafe-self-publish-the-smart-way-8.png" />
                                <span className="card-title">Smiling for the world</span>
                            </div>
                            <div className="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div className="card-action">
                                <a style={{ float: 'left', height: 28, color: 'red', border: '2px solid black', }} href="#"><i className="material-icons">delete</i></a>
                                <a style={{ float: 'right', height: 28, color: 'green', border: '2px solid black', }} href="#"><i className="material-icons">edit</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="pagination">
                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                <li className="active"><a href="#!">1</a></li>
                <li className="waves-effect"><a href="#!">2</a></li>
                <li className="waves-effect"><a href="#!">3</a></li>
                <li className="waves-effect"><a href="#!">4</a></li>
                <li className="waves-effect"><a href="#!">5</a></li>
                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
            </ul>
        </div>
        )
    }
}
