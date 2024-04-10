import { useEffect, useState } from 'react';
// import productsJSON from '../../data/products.json';

import styles from '../../css/HomePage.module.css';
import CarouselGallery from '../../components/home/CarouselGallery';
import SortButtons from '../../components/home/SortButtons';
import Product from '../../components/home/Product';
import { ToastContainer } from 'react-toastify';
import Pagination from 'react-bootstrap/Pagination';
import FilterButtons from '../../components/home/FilterButtons';

// 12. 03.04
// 13. 05.04 Alamkomponente ja andmete saatmist nende vahel (props), useContext -> globaalne muutuja
// 14. 10.04 Sisselogimist/registreerumist / Firebase
// 15. 12.04 Disainer
// 16. 17.04 Redux, Custom Hook
// 17. 19.04 1h45min, TypeScript
// 18. 03.05  --> lõpuprojekti esitlemine

function HomePage() {
	const [product, setProduct] = useState([]); // 3 - palju lehel
	const [catProduct, setCatProduct] = useState([]); // 5 - mitu tk kategoorias
	const [categories, setCategories] = useState([]); // 20 - mitu tk kokku

	const [isLoading, setLoading] = useState(true);

	const [origProduct, setOrigProduct] = useState([]);

	const [pageNumbers, setPageNumbers] = useState([]);
	const [activePage, setActivePage] = useState(1);

	const changePage = (newPage) => {
		setActivePage(newPage);
		setProduct(catProduct.slice(newPage * 3 - 3, newPage * 3));
	};

	return (
		<div>
			<CarouselGallery />

			<div>Total: {origProduct.length} tk</div>
			<div>In category: {catProduct.length} tk</div>
			<div>{product.length} tk</div>

			<SortButtons product={product} setProduct={setProduct} />
			<FilterButtons
				categories={categories}
				origProduct={origProduct}
				isLoading={isLoading}
				setCategories={setCategories}
				setCatProduct={setCatProduct}
				setProduct={setProduct}
				setPageNumbers={setPageNumbers}
				setActivePage={setActivePage}
				setOrigProduct={setOrigProduct}
				setLoading={setLoading}
			/>
			<div className={styles.products}>
				{product.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</div>
			<Pagination>
				{' '}
				{pageNumbers.map((pageNumber) => (
					<Pagination.Item
						key={pageNumber}
						onClick={() => changePage(pageNumber)}
						active={pageNumber === activePage}
					>
						{pageNumber}
					</Pagination.Item>
				))}
			</Pagination>
			<ToastContainer />
		</div>
	);
}

export default HomePage;
