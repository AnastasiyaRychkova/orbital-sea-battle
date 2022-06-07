// конфигурационный файл
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
	.use( Backend )
	.use( LanguageDetector ) // для определения языка пользователя
	.use( initReactI18next )
	.init( {
		// debug: true,
		fallbackLng: 'ru',
		load: 'languageOnly'
	} );

export default i18n;