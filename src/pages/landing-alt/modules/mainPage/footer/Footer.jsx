import React, { Fragment } from 'react'

import imgPlay from '../../../img/common/play.svg';

import style from './Footer.module.scss'
import styleButton from '../../buttons/Button.module.scss'
import styleIcons from '../../icons/Icons.module.scss'

import cx from 'classnames'

const Footer = () =>{
  return (
	<div className={style.wrap}>
		<div className={style.header}>
			<span className='header-1'>orbital battleship</span>
			<span className='header-5'>образовательная игра по&nbsp;химии</span>
		</div>
		<div className={style['background-radar']}>
			{/* <button type="button" className="button-img radar-button">играть</button> */}
			<button className={cx(styleButton['button-primary-bright'],styleButton['button-start-mission'],styleButton['button-icon'], style['button-location'])}>
				<img src={imgPlay} className={styleIcons['icon-tiny']}/>
				играть
			</button>
		</div>
		<footer className={style['footer-info']}>
			<span>© 2022 Университет ИТМО</span>
			<div className={style.links}>
				<a href="#">Правила использования информации в доменной зоне itmo.ru</a>
				<a href="#">Политика по обработке Персональных данных</a>
			</div>
		</footer>
	</div>

  )
}

export default Footer;