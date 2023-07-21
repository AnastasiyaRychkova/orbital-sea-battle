import React from 'react';
import cn from 'classnames';

import imgSCAMT from '../../../img/common/SCAMT_Logo.svg';
import imgITMO from '../../../img/common/ITMO_Logo.png';

import style from './AboutProject.module.scss';
import { AboutProjectItem } from './AboutProjectItem/AboutProjectItem';
import { useTranslation } from 'react-i18next';


const AboutProject = () => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing.project' } );
	return (
		<section
			className={cn( 'content-width', style.about )}
			id="project"
		>
			<h2 className={cn( 'header-2', style.header )}>О проекте</h2>
			<div className={cn( style.statistic, style.container )}>
				<AboutProjectItem
					prefix={t( 'from' )}
					header={2016}
					subheader={t( 'year' )}
					description={t( 'implementation' )}
				/>
				<AboutProjectItem
					header={2}
					subheader={t( 'articles' )}
					description={t( 'publishing' )}
				/>
				<AboutProjectItem
					header={2}
					subheader={t( 'grants' )}
					description={t( 'grants-goal' )}
				/>
				<AboutProjectItem
					header={'VR'}
					subheader={t( 'version' )}
					description={t( 'presented' )}
				/>
			</div>
			<div className={style.partners}>
				<img src={imgITMO}
					alt="ITMO"
					className={style.itmoLogo}
				/>
				<img src={imgSCAMT}
					alt="SCAMT ITMO"
				/>
			</div>
		</section>
	);
};

export default AboutProject;
