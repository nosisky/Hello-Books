import React, { Component } from 'react';

class EditModal extends Component {
	render() {
		if (!this.props.show) {
			return null;
		}
		return (
			<div className="backdrop">
				<div className="modal">
					{this.props.children}

					<div className="footer">
						<button onClick={this.props.onClose}>Close</button>
					</div>
				</div>
			</div>
		);
	}
}

export default EditModal;
