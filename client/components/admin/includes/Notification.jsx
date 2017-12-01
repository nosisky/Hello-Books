import React from 'react';
import moment from 'moment';

const Notification = ({ message, time }) => {
	const newTime = moment(time).format('MMMM Do YYYY, h:mm a');
	return (
		<div>
			<ul className="collection">
				<li className="collection-item avatar" id="collection-item">
					<i className="material-icons circle main-green">insert_chart</i>
					<span className="title">{message.toUpperCase()}</span>
					<div className="secondary-content">
						<i className="Tiny material-icons">access_time</i> {newTime}
						<br />
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Notification;
