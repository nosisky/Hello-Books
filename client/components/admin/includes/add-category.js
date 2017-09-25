import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AddBook extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input placeholder="Placeholder" id="title" type="text" className="validate" />
                                <label for="title">Title</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="isbn" type="text" className="validate" />
                                <label for="isbn">ISBN</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select name='category'>
                                    <option>Music</option>
                                    <option>Music</option>
                                    <option>Music</option>
                                    <option>Music</option>
                                    <option>Music</option>
                                </select>
                                <label for="Category">Category</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="textarea1" class="materialize-textarea" name="description"></textarea>
                                <label for="descriptions">Descriptions</label>
                            </div>
                        </div>
                        <div class="file-field input-field">
                            <div class="btn">
                                <span>File</span>
                                <input type="file" />
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
