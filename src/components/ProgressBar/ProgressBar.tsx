import React, {FC} from 'react';
import cn from '../className';
import styles from './ProgressBar.module.css';

interface IProps {
	/** Доля заполнения. Значение от 0 до 1 */
	value: number,

	/** Стили, переданные родителем */
	className?: string,
}

const clamp = (
	num: number
	) => Math.min( Math.max(num, 0), 1 );

/** __Полоса загрузки__
 * 
 * Принимает значение от 0 до 1.
 * 
 * _Цвет полосы можно переопределить через цвет текста._
 */
const ProgressBar: FC<IProps> = ({
	value,
	className,
}) => {
	const percent = clamp( value ) * 100;
	return (
		<div className={cn( styles, ['progressBar'], className )}>
			<div
				className={styles.infill}
				style={{width: percent+'%'}}>
			</div>
		</div>
	);
};

export default ProgressBar;