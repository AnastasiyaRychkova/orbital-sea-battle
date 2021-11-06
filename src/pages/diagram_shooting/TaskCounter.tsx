import React from 'react';
import classNames from 'classnames';
import styles from './TaskCounter.module.css';

interface IProps {
	className: string,
	complete: number,
	total: number,
}

const TaskCounter = ( props: IProps ) => {
	return (
		<div className={classNames( styles.counter, props.className )}>
			<span>{props.complete}</span>
			/
			<span>{props.total}</span>
		</div>
	);
}

export default TaskCounter;