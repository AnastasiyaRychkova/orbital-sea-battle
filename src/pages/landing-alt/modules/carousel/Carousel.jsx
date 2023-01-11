import React, { Fragment } from 'react'
import styles from './Carousel.module.scss';
import imgCarouselBack from '../../img/mainPage/carousel.png';

import cx from 'classnames'

const Carousel = ({ className,element }) => (
	<div className={className}>
	<input checked type="radio" name="respond" id="desktop"/>
	<div id="slider">
			<input checked type="radio" name="slider" id="switch1"/>
			<input type="radio" name="slider" id="switch2"/>
			<input type="radio" name="slider" id="switch3"/>
			<div id="slides">
				<div id="overflow">
					<div class="image">
						<article><img src={imgCarouselBack}/></article>
						<article><img src=""/></article>
						<article><img src=""/></article>
					</div>
				</div>
			</div>
			<div id="controls">
				<label for="switch1"></label>
				<label for="switch2"></label>
				<label for="switch3"></label>
			</div>
			<div id="active">
				<label for="switch1"></label>
				<label for="switch2"></label>
				<label for="switch3"></label>
			</div>
	</div>
	</div>
)

export default Carousel