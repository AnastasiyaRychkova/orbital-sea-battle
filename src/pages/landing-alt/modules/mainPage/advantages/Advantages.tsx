import React from 'react';
import { useTranslation } from 'react-i18next';
import { icons } from './icons';
import styles from './Advantages.module.scss';


const Advantages = () => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing.game' } );
	const items = Array.from( {length: 4} ).map( ( _, index ) => (
		<div
			key={index}
			className={styles.block}
		>
			{( icons[ index ] )( {
				className: styles.img,
			} )}
			<div className={styles.description}>
				<h3 className="text-medium bold">
					{t( 'title-' + ( index + 1 ) )}
				</h3>
				<p className="long-normal">
					{t( 'text-' + ( index + 1 ) )}
				</p>
			</div>
		</div>
	) );


	return (
		<section>
			<div className={styles.header}>
				<h2 className="header-2">
					{t( 'header' )}
				</h2>
				<span className="header-5 bold">
					ORBITAL BATTLESHIP — {t( 'subheader' )}...
				</span>
			</div>
			<div className={styles.advantages}>
				{items}
			</div>

			{/* </div> */}
		</section>
	);
};

export default Advantages;
