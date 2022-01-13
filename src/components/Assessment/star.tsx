import React, {FC, useCallback} from 'react';
import styles from './style.module.css';

interface IProps {
	value: number,
	name: string,
	onChange?: ( name: string, value: number ) => void,
	checkedInit?: boolean,
}

const Star: FC<IProps> = ({
	name,
	value,
	onChange,
	checkedInit = false,
}) => {
	const id = name+value;
	const callback = useCallback(() => {
		onChange && onChange( name, value );
	},
	[]);
	return (
		<>
			<input
				className={styles.input}
				type="radio"
				name={name}
				id={id}
				onChange={callback}
				defaultChecked={checkedInit} />
			<label className={styles.value} htmlFor={id}>
				<svg xmlns="http://www.w3.org/2000/svg"
					className={styles.star}
					width="40"
					height="40"
					fill="none"
					viewBox="0 0 100 100">
				
					<path strokeWidth="4" d="M49.75 15.653l12.429 18.135.301.44.512.151 21.088 6.217L70.673 58.02l-.325.423.015.533.604 21.977-20.714-7.366-.503-.179-.503.179-20.714 7.366.604-21.977.015-.533-.325-.423L15.42 40.595l21.088-6.216.512-.15.301-.44L49.75 15.652z"/>
				</svg>
			</label>
		</>
	);
};

export default Star;