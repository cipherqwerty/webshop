import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<div>
			<Link to='/'>
				<img src='./error.png' alt='' />
			</Link>
		</div>
	);
}

export default NotFound;
