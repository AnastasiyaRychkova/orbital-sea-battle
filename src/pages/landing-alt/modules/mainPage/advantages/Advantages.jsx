import React, { Fragment } from 'react'

import style from './Advantages.module.scss' 

import imgArrows from '../../../img/mainPage/arrows.svg';
import imgLabyr from '../../../img/mainPage/labyrinth.svg';
import imgRising from '../../../img/mainPage/rising.svg';
import imgCells from '../../../img/mainPage/cells.svg';

const Advantages = () =>{

  return (

	<Fragment>
		<div className={style.header}>
			<h1 className='header-2-3'>это не просто игра</h1>
			<span className='header-5 bold'>ORBITAL BATTLESHIP 	&mdash; это...</span>
		</div>
		<div className={style.advantages}>

			<div className={style.block}>
				<img src={imgArrows} className={style.img}/>
				<div>
					<h3 className='text-medium bold'>Закрепление правил Клечковского и&nbsp;Хунда</h3>
					<p className='long-normal'>Знание правил химии — залог победы.</p>
				</div>
			</div>
			<div className={style.block}>
				<img src={imgCells} className={style.img}/>
				<div>
					<h3 className='text-medium bold'>Демонстрация периодичности элементов</h3>
					<p className='long-normal'>Вставить сюда какой-нибудь текст про периодичность.</p>
				</div>
			</div>
			<div className={style.block}>
				<img src={imgLabyr} className={style.img}/>
				<div>
					<h3 className='text-medium bold'>Развитие стратегических навыков</h3>
					<p className='long-normal'>Разрабатывай свою стратегию, чтобы обогнать противника.</p>
				</div>
			</div>
			<div className={style.block}>
				<img src={imgRising} className={style.img}/>
				<div>
					<h3 className='text-medium bold'>Повышение мотивации и&nbsp;концентрации</h3>
					<p className='long-normal'>Играй, зарабатывай баллы, выполняй задания и станешь профи.</p>
				</div>
			</div>
		</div>

	{/* </div> */}
	</Fragment>
  )
}

export default Advantages;