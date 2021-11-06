import React from 'react';
import styles from './TaskResult.module.css';

interface IProps {
	correct: boolean,
}

const TaskResult = ( props: IProps ) => {
	return (
		<div className={styles.popup}>
			<div className={styles.resIcon}>
			{
				props.correct
				?
				(<svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M75 15C41.865 15 15 41.865 15 75C15 108.135 41.865 135 75 135C108.135 135 135 108.135 135 75C135 41.865 108.135 15 75 15ZM108.535 63.535L70.735 101.335C69.795 102.275 68.525 102.8 67.2 102.8C65.875 102.8 64.6 102.275 63.665 101.335L46.4 84.07C44.445 82.115 44.445 78.955 46.4 77C48.355 75.045 51.515 75.045 53.47 77L67.2 90.73L101.465 56.465C103.42 54.51 106.58 54.51 108.535 56.465C110.49 58.42 110.49 61.58 108.535 63.535Z" fill="#61C35A"/>
				</svg>)
				:
				(<svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M75 15C41.865 15 15 41.865 15 75C15 108.135 41.865 135 75 135C108.135 135 135 108.135 135 75C135 41.865 108.135 15 75 15ZM82.07 75C82.07 75 97.765 90.695 98.535 91.465C100.49 93.42 100.49 96.585 98.535 98.535C96.58 100.49 93.415 100.49 91.465 98.535C90.695 97.77 75 82.07 75 82.07C75 82.07 59.305 97.765 58.535 98.535C56.58 100.49 53.415 100.49 51.465 98.535C49.51 96.58 49.51 93.415 51.465 91.465C52.23 90.695 67.93 75 67.93 75C67.93 75 52.235 59.305 51.465 58.535C49.51 56.58 49.51 53.415 51.465 51.465C53.42 49.51 56.585 49.51 58.535 51.465C59.305 52.23 75 67.93 75 67.93C75 67.93 90.695 52.235 91.465 51.465C93.42 49.51 96.585 49.51 98.535 51.465C100.49 53.42 100.49 56.585 98.535 58.535C97.77 59.305 82.07 75 82.07 75Z" fill="#C03F37"/>
				</svg>)
			}
			</div>
		</div>
	);
};

export default TaskResult;