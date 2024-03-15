import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavBar() {
	const { t, i18n } = useTranslation();

	const changeLangEe = () => {
		i18n.changeLanguage('ee');
	};

	const changeLang = (lang) => {
		i18n.changeLanguage(lang); // react 18n moodul
		localStorage.setItem('language', lang); // js
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
						<Nav.Link as={Link} to='/admin'>
							Admin
						</Nav.Link>
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

						<Nav.Link as={Link} to='/login'>
							{t('login')}
						</Nav.Link>
						<Nav.Link as={Link} to='/signup'>
							{t('signup')}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
