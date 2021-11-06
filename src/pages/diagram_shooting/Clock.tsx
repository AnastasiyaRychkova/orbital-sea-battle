import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Clock.module.css';

type TimeStamp = number;

interface IProps {
	className: string,
	timeStamp: TimeStamp,
}

type Time = {
	minutes: TimeStamp,
	seconds: TimeStamp,
}

function calcTime( timeStamp: TimeStamp ): Time
{
	const duration = timeStamp ? Math.abs( Math.floor( Date.now() - timeStamp ) ) : 0;

	return {
		minutes: Math.floor( ( duration / ( 1000 * 60 ) ) % 60 ),
		seconds: Math.floor( ( duration / 1000 ) % 60 ),
	}
}

const Clock = ( props: IProps ) => {
	const [timePeriod, setTimePeriod] = useState( calcTime( props.timeStamp ) );

	useEffect(() => {
		const timeout = setTimeout(
			() => {
				setTimePeriod( calcTime( props.timeStamp ) );
			},
			1000
		);

		return () => {
			clearTimeout( timeout );
		};
	})
	return (
		<div className={classNames( styles.clock, props.className ) }>
			<span>{timePeriod.minutes}</span>
			:
			<span>{timePeriod.seconds}</span>
		</div>
	);
};

export default Clock;