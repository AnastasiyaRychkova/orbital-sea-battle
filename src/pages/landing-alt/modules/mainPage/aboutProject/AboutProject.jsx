import React from 'react'

import TeamMembers from '../teamMembers/TeamMembers.jsx'
import imgSCAMT from '../../../img/common/SCAMT_Logo.svg'
import imgITMO from '../../../img/common/ITMO_Logo.svg'


import style from './AboutProject.module.scss'

import cx from 'classnames'

const AboutProject = () =>{
  return (
	<section className={cx('content-width',style.about)}>
		<h2 className={cx('header-2-3',style.header)}>О проекте</h2>
		<div className={cx(style.statistic, style['multiple-container'])}>
			<div className={style.element}>
				<span className={style['thin_heading']}>c &nbsp;</span>
				<span className='header-1 bold'>2016</span>
				<span className={cx('header-4 bold', style['line-transfer'])}>года</span>
				<p className={style.description}>проект внедрен в&nbsp;образовательный процесс по&nbsp;химии</p>
			</div>
			<div className={style.element}>
				<span className='header-1 bold'>2</span>
				<span className={cx('header-4 bold', style['line-transfer'])}>статьи</span>
				<p className={style.description}>в&nbsp;ведущем научном издании Journal of&nbsp;Chemical Education</p>
			</div>
			<div className={style.element}>
				<span className='header-1 bold'>2 </span>
				<span className={cx('header-4 bold', style['line-transfer'])}>гранта</span>
				<p className={style.description}>посвященных обучению химии в&nbsp;среде VR</p>
			</div>
			<div className={style.element}>
				<span className='header-1 bold'>VR </span>
				<span className={cx('header-4 bold', style['line-transfer'])}>версия</span>
				<p className={style.description}>успешно разработана и&nbsp;представлена на&nbsp;выставках</p>
			</div>
		</div>
		<TeamMembers></TeamMembers>
		<div className={style.partners}>
			<img src={imgITMO}/>
			<img src={imgSCAMT}/>
		</div>
	</section>
	)
}

export default AboutProject
