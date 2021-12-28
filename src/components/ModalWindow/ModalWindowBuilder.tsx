import React, {FC} from 'react';
import { observer } from 'mobx-react';
import Button from '../Button/Default/Button';
import ModalWindow from './ModalWindow';
import Header from './subelements/Header';
import Paragraph from './subelements/Paragraph';

import styles from './subelements/styles.module.css';

type SubElementType = 'paragraph' | 'image' | 'progress' | 'results';

type MWSubElementScheme = {
	type: SubElementType,
	value?: string,
	url?: string,
	style?: string,
}

type MWButton = {
	value: string,
	action?: () => void,
	to?: string,
}

type MWScheme = {
	header: string,
	subheader?: string,
	content: MWSubElementScheme[],
	actions: MWButton[],
	align?: 'center'|'left',
};


interface IProps {
	provider: { window: MWScheme| null },
	className?: string,
}




const ModalWindowBuilder: FC<IProps> = observer( ( props ) => {

	if( !props.provider.window )
		return (null);
	
	const {
		header,
		content,
		actions,
		align = 'left',
	} = props.provider.window;

	return (
		<ModalWindow>
			<header className={styles.mwHeader +' '+ styles[align]}>
				<Header>{header}</Header>
			</header>
			<div className={styles.mwContent}>
			{
				content.map(( elem, index ) => {
					return (
						<Paragraph key={index}>
							{elem.value}
						</Paragraph>
					)
				})
			}
			</div>
			<div className={styles.mwActions +' '+ styles[align]}>
				{ actions.length > 0 &&
					<Button
						priority='primary'
						value={actions[0].value}
						onClick={actions[0].action}
						className={styles.mwButton}
						to={actions[0].to}
						replace={true} /> }
				{ actions.length > 1 &&
					<Button
						priority='secondary'
						value={actions[1].value}
						onClick={actions[1].action}
						className={styles.mwButton}
						to={actions[1].to}
						replace={true} /> }
			</div>
		</ModalWindow>
	);
});



export default ModalWindowBuilder;