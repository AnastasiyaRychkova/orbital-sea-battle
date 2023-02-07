import React from 'react';
import Header from './modules/header/Header';
import WelcomePage from './modules/mainPage/WelcomePage/WelcomePage';
import Advantages from './modules/mainPage/advantages/Advantages';
import Rules from './modules/mainPage/rules/Rules';
import AboutProject from './modules/mainPage/aboutProject/AboutProject';
import Footer from './modules/mainPage/footer/Footer';
import './Landing.styles.scss';


export const Landing = () => {
	return (
		<div className="landing">
			<Header />
			<WelcomePage />
			<Advantages />
			<Rules />
			<AboutProject />
			<Footer />
		</div>
	);
};


