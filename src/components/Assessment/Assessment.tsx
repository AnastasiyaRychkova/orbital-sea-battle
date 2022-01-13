import React, {FC} from 'react';
import cn from '../className';
import Star from './star';
import styles from './style.module.css';


interface IProps {
	/** Максимальная оценка (>1) */
	scale: number,

	/** Название для input */
	name: string,

	/** Функция, вызывающаяся при клике на символ оценки */
	onChange?: ( name: string, value: number ) => void,

	/** Выбранное значение по-умолканию (от 1 до `scale`) */
	initValue?: number,

	className?: string,
}


const Assessment: FC<IProps> = ({
	scale,
	name,
	onChange,
	initValue,
	className,
}) => {
	return (
		<div className={cn(styles, ['scale'], className)}>
			{ build(scale, name, initValue, onChange) }
		</div>
	);
};


function build(
	scale: number,
	name: string,
	defaultValue?: number,
	onChange?: ( name: string, value: number ) => void,
): JSX.Element[]
{
	const res: JSX.Element[] = [];
	for (let i = scale; i > 0; i--) {
		res.push((
			<Star
				name={name}
				value={i}
				key={i}
				onChange={onChange}
				checkedInit={i === defaultValue}
				/>
		))
	}

	return res;
}

export default Assessment;