import React from 'react';
import Button from '../../../components/Button/WithIcon/Button';
import page from '../ExpPage';
import styles from './StartPage.module.css';



const Start = () => {
	return (
		<div className={styles.page}>
			<div className={styles.instruction}>
				<p><span className={styles.headerText}>{page.window?.header}</span></p>
				<p><span className={styles.text}>{page.window && page.window.content.length && page.window.content[0].value}</span></p>
			</div>
			<Button
				priority='primary'
				theme='muted'
				glyph='play'
				value={page.window?.actions[0].value || 'Start'}
				to={page.window?.actions[0].to}
				/>
		</div>
	);
};

export default Start;