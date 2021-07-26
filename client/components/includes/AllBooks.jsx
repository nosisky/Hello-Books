import React from 'react';
import PropTypes from 'prop-types';

const AllBooks = ({ 
	handleAction, 
	cover, 
	title, 
	description, 
	id, 
	isReturned, 
	rented }) => {
		
	const handleClick = () => {
		handleAction(id);
	};
	return (
		<div className="col s12 m3 l3" style={{backgroundColor: '#fff'}} >
		<div className="card" id="book_card">
						<div className="card-image">
							<img height="250px" src={cover} alt="loading image..." />
							<span className="card-title">{title}</span>
						</div>
						<div className="truncate card-content">
							<p>{description}</p>
						</div>
						<div className="card-action">
						{rented && !isReturned && (
								<a id="returnBook" onClick={handleClick} 
								className="btn">
									Return
								</a>
							)}
							{rented && isReturned && (
								<a  id="returnBook" onClick={handleClick} 
								className="btn disabled">
									Returned
								</a>
							)}
							{!rented && (
								<a  id="borrowNow" onClick={handleClick} 
								className="btn">
									Borrow
								</a>
							)}
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
