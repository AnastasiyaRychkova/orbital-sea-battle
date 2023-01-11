import React, { Fragment } from 'react'
import Header from '../../modules/header/Header' 
import WelcomePage from '../../modules/mainPage/WelcomePage/WelcomePage.jsx'
import Advantages from '../../modules/mainPage/advantages/Advantages.jsx'
import Rules from '../../modules/mainPage/rules/Rules.jsx'
import AboutProject from '../../modules/mainPage/aboutProject/AboutProject.jsx'
import Footer from '../../modules/mainPage/footer/Footer'
// import contentStyle from '../bodyStyle.css' 



const MainPage = () =>{
	return (
	<body className='contentCenterLong'>
		<Header></Header> 
		<WelcomePage></WelcomePage>
		<Advantages></Advantages>
		<Rules></Rules>
		<AboutProject></AboutProject>
		<Footer></Footer>
	</body>
	)
}

export default MainPage;