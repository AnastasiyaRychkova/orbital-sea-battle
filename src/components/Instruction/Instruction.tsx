import React from 'react';
import styles from './Instruction.module.css';

import captain from '../../img/instruction/captain.svg'
// import tail from '../../img/instruction/tail.svg'

import { useTranslation } from 'react-i18next';

interface IProps {
	/** Сообщение */
	message: string,

	/** Функция для закрытия окна */
	onClick: () => void,
}

/** Компонент для вывода инструкций игроку */
export default function Instruction( props: IProps ) {
	const { t } = useTranslation();

	return ( 
		<>
			<div
				className = { styles.overlay }
				onClick = { () => { props.onClick(); } }
			>
				<div className = { styles.bubble }>
					{ props.message }
				</div>

				<img
					className = { styles.captain }
					src = { captain }
					height = "760"
					width = "600"
					alt = { t("components.captain") }
				/>
			</div>
		</>
	);
}