import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { CartSumContext } from '../store/CartSumContext';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
function NavBar() {
	const { t, i18n } = useTranslation();

	const { cartSum } = useContext(CartSumContext);

	const { loggedIn, setLoggedIn } = useContext(AuthContext);

	const navigate = useNavigate();

	const changeLangEe = () => {
		i18n.changeLanguage('ee');
	};

	const changeLang = (lang) => {
		i18n.changeLanguage(lang); // react 18n moodul
		localStorage.setItem('language', lang); // js
	};

	const logout = () => {
		setLoggedIn(false);
		navigate('/');
	};
	return (
		<Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					Cipher's webshop
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						{loggedIn && (
							<Nav.Link as={Link} to='/admin'>
								Admin
							</Nav.Link>
						)}
						<Nav.Link as={Link} to='/shops'>
							{t('shops')}
						</Nav.Link>
						<Nav.Link as={Link} to='/contact'>
							{t('contact')}
						</Nav.Link>
						<Nav.Link as={Link} to='/cart'>
							{t('cart')}
						</Nav.Link>
					</Nav>
					<Nav>
						<span>{cartSum} $</span>
						<img
							onClick={() => changeLang('ja')}
							className='lang'
							src='/japan.png'
							alt=''
						/>
						<img
							onClick={() => changeLang('es')}
							className='lang'
							src='/spanish.png'
							alt=''
						/>
						<img
							onClick={() => changeLang('en')}
							className='lang'
							src='/english.png'
							alt=''
						/>
						<img
							onClick={changeLangEe}
							className='lang'
							src='/estonian.png'
							alt=''
						/>

						{loggedIn === false && (
							<Nav.Link as={Link} to='/login'>
								{t('login')}
							</Nav.Link>
						)}
						{loggedIn === false && (
							<Nav.Link as={Link} to='/signup'>
								{t('signup')}
							</Nav.Link>
						)}
						{loggedIn && <Nav.Link onClick={logout}>Log out</Nav.Link>}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
