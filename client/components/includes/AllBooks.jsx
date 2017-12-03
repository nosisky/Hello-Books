import React from 'react';
import PropTypes from 'prop-types';

const AllBooks = ({ handleBorrow, cover, title, description, id }) => {
	const handleClick = () => {
		handleBorrow(id)
	}
	return (
		<div>
			<div className="book col s12 m3 l3">
				<div className="card">
					<div className="card-image waves-effect waves-block waves-light">
						<img className="activator" 
						src={cover} />
					</div>
					<div className="card-content">
						<span className="card-title">
							{title}</span>
						<span className="truncate">
							{description}</span>
						<p>
							<a href="#" 
							id="borrowNow" 
							onClick={handleClick} 
							className="btn">
								Borrow Now
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

AllBooks.PropTypes = {
	handleBorrow: PropTypes.func.isRequired,
	cover: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};


export default AllBooks;
