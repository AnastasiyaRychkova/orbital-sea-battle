import React, { Fragment } from 'react';

import Slider from '../../carousel/Slider.jsx';
import style from './Rules.module.scss';
import imgPerson from '../../../img/common/person.svg';
import styleIcons from '../../icons/Icons.module.scss';
import styleButton from '../../buttons/Button.module.scss';

import cx from 'classnames';

const Rules = () =>{
	return (
		<Fragment>
			<div className={style.header}>
				<h1 className="header-2-3">как играть?</h1>
				<span className="header-5 bold">тот же морской бой, только с химическими элементами</span>
			</div>
			<div className={style.content}>
				{/* <Carousel className={style.manual}></Carousel> */}
				<Slider 
					width="100%"
					height="100%"
					autoPlay
					autoPlayTime={5000}
					className={style.manual}
				>
				</Slider>
				<span className={style['slide-number']}>3</span>
				<button className={cx( styleButton['button-secondary-bright'],styleButton['button-icon'],styleButton['button-create-profile'], style['button-location'] )}>
					<img
						src={imgPerson}
						className={styleIcons['icon-small']}
						alt=""
					/>
					<span className="button-medium bold">создать профиль</span>
				</button>
				<div className={style.description}>Текст описания механики текст описания механикитекст описания механикитекст описания механикитекст описания механики.</div>

			</div>
		</Fragment>
	);
};

export default Rules;