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
		lng: 'ee', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
