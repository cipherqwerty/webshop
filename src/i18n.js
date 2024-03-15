import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: {
			'maintain-categories': 'Maintain categories',
			'maintain-shops': 'Maintain shops',
			'add-product': 'Add product',
			'maintain-products': 'Maintain products',
			shops: 'Our shops',
			contact: 'Contact us',
			cart: 'To cart',
			login: 'Login',
			signup: 'Create account',
		},
	},
	ee: {
		translation: {
			'maintain-categories': 'Halda kategooriaid',
			'maintain-shops': 'Halda poode',
			'add-product': 'Lisa toode',
			'maintain-products': 'Halda tooteid',
			shops: 'Meie poed',
			contact: 'Võta ühendust',
			cart: 'Ostukorvi',
			login: 'Login',
			signup: 'Loo uus konto',
		},
	},

	es: {
		translation: {
			'maintain-categories': 'Mantener categorías',
			'maintain-shops': 'Mantener los comercios',
			'add-product': 'Añadir producto',
			'maintain-products': 'Mantener los productos',
			shops: 'Tiendas',
			contact: 'Contacto',
			cart: 'Carro',
			login: 'Inicio de sesión',
			signup: 'Registrarse',
		},
	},

	ja: {
		translation: {
			'maintain-categories': 'カテゴリーの維持',
			'maintain-shops': 'ショップの管理',
			'add-product': '商品の追加',
			'maintain-products': '商品の管理',
			shops: 'ショップ',
			contact: '連絡先',
			cart: 'カート',
			login: 'ログイン',
			signup: 'サインアップ',
		},
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: localStorage.getItem('language') || 'ee',

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

// teha nii, et kui pannakse midagi muud localStorage kui meie keeled
// nt "klingon", siis võtab ikka default keele ja asendab selle
// klingoni localStorage-s ära
export default i18n;
