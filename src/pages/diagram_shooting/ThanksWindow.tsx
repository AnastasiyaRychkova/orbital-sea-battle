import React from 'react';
import classNames from 'classnames';
import styles from './Windows.module.css';

const ThanksWindow = () => {
	return (
		<div className={styles.window}>
			<div className={classNames(styles.content, styles.contentCenter)}>
				<h2>Благодарим за участие! ❤</h2>
			</div>
		</div>
	);
};

export default ThanksWindow;