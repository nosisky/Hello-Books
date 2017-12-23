import React from 'react';
import PropTypes from 'prop-types';

const AllBooks = ({ handleAction, cover, title, 
	description, id, isReturned, rented }) => {
		
	const handleClick = () => {
		handleAction(id);
	};
	return (
		<div>
			<div className="book col s12 m3 l3">
				<div className="card">
					<div className="card-image waves-effect waves-block waves-light">
						<img className="activator" src={cover} />
					</div>
					<div className="card-content">
						<span className="card-title">{title}</span>
						<span className="truncate">{description}</span>
						<p>
														
						{rented && !isReturned && (
								<a href="#" id="returnBook" onClick={handleClick} 
								className="btn">
									Return
								</a>
							)}
							{rented && isReturned && (
								<a href="#" id="returnBook" onClick={handleClick} 
								className="btn disabled">
									Returned
								</a>
							)}
							{!rented && (
								<a href="#" id="borrowNow" onClick={handleClick} 
								className="btn">
									Borrow
								</a>
							)}

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
