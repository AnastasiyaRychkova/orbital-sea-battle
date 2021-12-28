import React from 'react';
import Button from '../../../components/Button/WithIcon/Button';
import styles from './style.module.css';

const Start = () => {
	return (
		<div className={styles.page}>
			<Button
				priority='primary'
				theme='muted'
				glyph='info'
				value='Начать'
				to='/lesson/qn/w/instruction'
				/>
		</div>
	);
};

export default Start;