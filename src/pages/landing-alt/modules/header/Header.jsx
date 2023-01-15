import React from 'react'

import imgPlay from '../../img/common/play.svg';
import imgBurger from '../../img/common/menu.svg';
import imgCross from '../../img/common/cross.svg';
import styleButton from '../../modules/buttons/Button.module.scss';
import style from './Header.module.scss' 
import cx from 'classnames'

const Header = () =>{
  return (
    <header className={style.header}>
      <a href="#welcome" className={style['a-logo']}></a>
      <nav>
        <ul className={style['header__nav__ul']}>
          <li><a href="#" className={cx(style['header__nav__link'], style['selected'])} >об игре</a></li>
          <li><a href="#" className={style['header__nav__link']}>правила</a></li>
          <li><a href="#" className={style['header__nav__link']}>о проекте</a></li>
          <li>
            <button className={cx(styleButton['button-icon'], style['header__sign'] )}>
              <img src={imgPlay} className={style['img-enter']}/> 
              <span>войти</span>
            </button>
            
          </li>
        </ul>
      </nav>
      <button className={cx(styleButton['button-icon'],style.burger)}>
          <img src={imgBurger} />
          {/* <img src={imgCross} /> */}
      </button>
    </header>
  )
}

export default  Header;