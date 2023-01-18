import React, { FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Icon from '../../Icon/Icon';
import type { Glyph } from '../../Icon/glyph/type';
import styles from './Button.module.css';

type Priority = 'primary' | 'secondary' | 'tertiary';

interface IProps {
	/** Надпись на кнопке */
	value: string;

	/** Название иконки */
	glyph: Glyph;

	/** Параметр стиля*/
	priority: Priority;

	/** Заблокирована ли кнопка */
	disabled?: boolean;

	/** Функция по нажатию */
	onClick?: MouseEventHandler<HTMLElement>;

	/** URL */
	to?: string;

	/** Нужно ли переопределить путь */
	replace?: boolean;

	/** Маленькая ли кнопка */
	small?: boolean;

	/** Стили, переданные родителями */
	className?: string;
}

const Button: FC<IProps> = ( {
	value,
	glyph,
	priority,
	disabled = false,
	small = false,
	className,
	onClick,
	to = '#',
	replace = false,
} ) => {
	return to === '#' ? (
		<button
			type="button"
			disabled={disabled}
			onClick={onClick}
			className={cn(
				styles.button,
				styles[priority],
				{ [styles.small]: small },
				className
			)}
		>
			<Icon type={glyph}
				className={styles.icon}
			/>
			<span
				className={cn(
					styles.text,
					small ? 'button-normal' : 'button-medium'
				)}
			>
				{value}
			</span>
		</button>
	) : (
		<Link
			to={to}
			replace={replace}
			onClick={onClick}
			className={cn(
				styles.button,
				styles[priority],
				{ [styles.small]: small },
				className
			)}
		>
			<Icon type={glyph}
				className={styles.icon}
			/>
			<span
				className={cn(
					styles.text,
					small ? 'button-normal' : 'button-medium'
				)}
			>
				{value}
			</span>
		</Link>
	);
};

export default Button;
export { Button as ButtonWithIcon };
