import React, { Fragment } from 'react'

import style from './TeamMembers.module.scss'
import cx from 'classnames'

const TeamMembers = () =>{
  return (
	<Fragment>

		<h3 className={cx('header-3',style.header)}>Команда</h3>

		<div className={cx(style.team, style['multiple-container'])}>
			<div className={style.block}>
				<img src="img/index/Rectangle.png" width="278px" height="278px"/>
				<div className={style.member}>
					<span className={cx(style.person,'header-5')}>михаил КУРУШКИН</span>
					<span className={cx(style.description,'long-small')}>Создатель игры. Декан факультета биотехнологий Университета ИТМО.</span>
				</div>
			</div>
			<div className={style.block}>
				<img src="img/index/Rectangle.png" width="278px" height="278px"/>
				<div className={style.member}>
					<span className={cx(style.person,'header-5')}>АРТЕМ СМОЛИН</span>
					<span className={cx(style.description,'long-small')}>Создатель игры. Декан факультета биотехнологий Университета ИТМО.</span>
				</div>
			</div>
			<div className={style.block}>
				<img src="img/index/Rectangle.png" width="278px" height="278px"/>
				<div className={style.member}>
					<span className={cx(style.person,'header-5')}>АНАСТАСИЯ РЫЧКОВА</span>
					<span className={cx(style.description,'long-small')}>Создатель игры. Декан факультета биотехнологий Университета ИТМО.</span>
				</div>
			</div>
			<div className={style.block}>
				<img src="img/index/Rectangle.png" width="278px" height="278px"/>
				<div className={style.member}>
					<span className={cx(style.person,'header-5')}>АСИЯ ЕРМОЛАЕВА</span>
					<span className={cx(style.description,'long-small')}>Создатель игры. Декан факультета биотехнологий Университета ИТМО.</span>
				</div>
			</div>
			<div className={style.block}>
				<img src="img/index/Rectangle.png" width="278px" height="278px"/>
				<div className={style.member}>
					<span className={cx(style.person,'header-5')}>ИЛЬЯ КОЩЕЕВ</span>
					<span className={cx(style.description,'long-small')}>Создатель игры. Декан факультета биотехнологий Университета ИТМО.</span>
				</div>
			</div>
			<div className={style.block}>
				<img src="img/index/Rectangle.png" width="278px" height="278px"/>
				<div className={style.member}>
					<span className={cx(style.person,'header-5')}>АНГЕЛИНА МАЛЬКИВ</span>
					<span className={cx(style.description,'long-small')}>Создатель игры. Декан факультета биотехнологий Университета ИТМО.</span>
				</div>
			</div>
		</div>
	</Fragment>
  )
}

export default TeamMembers;