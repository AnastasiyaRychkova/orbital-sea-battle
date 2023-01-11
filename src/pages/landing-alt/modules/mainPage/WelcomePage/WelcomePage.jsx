import React from 'react'

import imgPlay from '../../../img/common/play.svg';
import imgPlayVideo from '../../../img/common/play-video.svg';
import imgFlip from '../../../img/common/flip.svg';
import imgShip from '../../../img/mainPage/ship.svg'
import style from './WelcomePage.module.scss' 
import styleButton from '../../buttons/Button.module.scss'
import styleIcons from '../../icons/Icons.module.scss'
import cx from 'classnames'

const WelcomePage = () =>{
  return (
    <div className={style['welcome-page']}>
      <div className={style.header}>
        <h1 className='header-1'>orbital battleship</h1>
        <span className='header-5 bold'>образовательная игра по&nbsp;химии</span>
      </div>
      <div className={style.content}>
        <img src={imgShip} className={cx(style.ship,style.left)}/>
        <img src={imgShip} className={cx(style.ship,style.right)}/>
        <div className={style.video}>
          <button className={styleButton['button-icon']}
          >
            <img src={imgPlayVideo} className={cx(style['play-video'], )}/>
          </button>
        </div>
        <button className={cx(styleButton['button-primary-bright'],styleButton['button-start-mission'],styleButton['button-icon'], style['button-location'])}>
          <img src={imgPlay} className={styleIcons['icon-tiny']}/>
          играть
        </button>
      </div>
      <button className={cx(styleButton['button-icon'])}
          >
            <img src={imgFlip} className={cx(styleIcons['icon-medium'], )}/>
          </button>
    </div>
  )
}

export default WelcomePage;