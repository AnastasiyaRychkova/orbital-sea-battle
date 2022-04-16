import React, {FC} from 'react';
import { observer } from 'mobx-react';
import {achievements} from "../../core/core";
import cn from '../className';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './GameProgress.module.css';



interface IProps {
	/** Нужно ли указывать уровень цифрой */
	withLevel?: boolean,

	/** Нужно ли указывать счет в числовом виде */
	withScore?: boolean,

	/** Нужно ли указывать название уровня */
	withName?: boolean,

	/** Стили, переданные родителем */
	className?: string,
}

const GameProgress: FC<IProps> = observer(({
	withLevel,
	withName,
	withScore,
	className,
}) => {
	return (
		<div className={cn( styles, ['gameProgress'], className )}>
			{ withLevel && achievements.level ?
				<div className={styles.levelNumber}>
					<span className={styles.levelText}>
						{achievements.level}
					</span>
				</div>
				: ''
			}
			<div className={styles.progress}>
				<div className={styles.scheme}>
					{ withName && achievements.name &&
					<div className={styles.levelName}>
						<span className={styles.nameText}>
							{achievements.name}
						</span>
					</div>
					}
					<ProgressBar
						value={achievements.score / achievements.goal}
						className={styles.achievementsBar} />
				</div>
				{ withScore &&
				<div className={styles.score}>
					<span className={styles.scoreText}>
						{achievements.score}/{achievements.goal}
					</span>
				</div>
				}
			</div>
		</div>
	);
});


export default GameProgress;