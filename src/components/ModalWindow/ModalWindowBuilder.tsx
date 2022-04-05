import React, {FC} from 'react';
import { observer } from 'mobx-react';
import cn from '../className';

import Button from '../Button/Default/Button';
import ModalWindow from './ModalWindow';
import Header from './subelements/Header';
import Paragraph from './subelements/Paragraph';
import GameProgress from '../GameProgress/GameProgress';
import MiniInfo from '../MiniInfo/MiniInfo';
import Assessment from '../Assessment/Assessment';

import styles from './subelements/styles.module.css';
import { ButtonActions, MWScheme, TaskResults, UserAssessment } from './types';

import diagram from '../../img/exp/diagram.png';
import n from '../../img/exp/n.png';
import l from '../../img/exp/l.png';
import m from '../../img/exp/m.png';
import s from '../../img/exp/s.png';


const img: {[key: string]: string} = {
	diagram,
	n,
	l,
	m,
	s
};


interface IProps {
	provider: {
		window: MWScheme | null,
		results: TaskResults | null,
	},
	variant: number,
	assessments: UserAssessment | null,
	buttons?: ButtonActions,
	className?: string,
}




const ModalWindowBuilder: FC<IProps> = observer( ( props ) => {

	if( !props.provider.window )
		return (null);
	
	const {
		header,
		content,
		actions,
		style = 'instruction',
	} = props.provider.window;

	const {
		variant,
		assessments,
		buttons,
	} = props;

	return (
		<ModalWindow className={cn(styles, ['mWindow', style])}>
			<header className={styles.mwHeader +' '+ styles[style]}>
				<Header>{header}</Header>
			</header>
			<div className={styles.mwContent}>
			{
				content.map(( elem, index ) => {
					if( elem.variant !== undefined && elem.variant !== variant )
						return null;

					switch( elem.type )
					{
						case 'paragraph':
							return (
								<Paragraph style={elem.style} key={'paragraph'+index}>
									{elem.value}
								</Paragraph>
							);
						case 'image':
							return (
								<img className={styles.mwImage} src={img[elem.value || '']} alt='' key={'image'+index} />
							);
						case 'progress':
							return (
								<GameProgress withLevel withScore withName key={'progress'+index} />
							);
						case 'results':
							return (
								<div className={styles.mwResults} key={'results'+index}>
								{
									props.provider.results &&
									props.provider.results.map(
										( info ) => (
											<MiniInfo
												key={info.name}
												provider={info.value}
												caption={info.name}
												glyph={info.icon}
												className={styles.mwMiniInfo} />
										)
									)
								}
								</div>
							);
						case 'mark':
							return (
								<Assessment
									name={elem.value || ''}
									initValue={assessments?.get(elem.value || '')}
									scale={10}
									onChange={assessments?.set}
									key={(elem.value || 'mark')+index}
									/>
							);
						default:
							return null;
					}
				})
			}
			</div>
			<div className={styles.mwActions +' '+ styles[style]}>
				{ actions.length > 0 &&
					<Button
						priority='primary'
						value={actions[0].value}
						onClick={buttons?.primary?.onClick}
						disabled={buttons?.primary?.disabled}
						className={styles.mwButton}
						to={actions[0].to}
						replace={true} /> }
				{ actions.length > 1 &&
					<Button
						priority='secondary'
						value={actions[1].value}
						onClick={buttons?.secondary?.onClick}
						disabled={buttons?.secondary?.disabled}
						className={styles.mwButton}
						to={actions[1].to}
						replace={true} /> }
			</div>
		</ModalWindow>
	);
});



export default ModalWindowBuilder;