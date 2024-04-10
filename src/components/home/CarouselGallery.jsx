import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselGallery() {
	const [pictures, setPictures] = useState([]);

	useEffect(() => {
		fetch(process.env.REACT_APP_PICTURES_URL)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPictures(data || []);
			});
	}, []);

	return (
		// KUVA VALJA ANDMEBAASIST
		<div>
			<Carousel data-bs-theme='dark'>
				{pictures.map((picture, index) => (
					<Carousel.Item key={index}>
						<img src={picture.src} alt={picture.alt} />
						<Carousel.Caption>
							<h5>{picture.header}</h5>
							<p>{picture.text}</p>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	);
}

export default CarouselGallery;
