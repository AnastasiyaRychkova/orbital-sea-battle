import React from 'react';
import Header from './modules/header/Header';
import WelcomePage from './modules/mainPage/WelcomePage/WelcomePage';
import Advantages from './modules/mainPage/advantages/Advantages';
import Rules from './modules/mainPage/rules/Rules';
import AboutProject from './modules/mainPage/aboutProject/AboutProject.jsx';
import Footer from './modules/mainPage/footer/Footer';


export const Landing = () => {
	return (
		<body className="contentCenterLong">
			<Header />
			<WelcomePage />
			<Advantages />
			<Rules />
			<AboutProject />
			<Footer />
		</body>
	);
};


