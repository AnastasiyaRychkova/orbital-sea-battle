import React, {FC} from 'react';
import { observer } from 'mobx-react';
import cn from '../className';
import styles from './GameProgress.module.css';
import ProgressBar from '../ProgressBar/ProgressBar';


type ProgressInfo = {
	level?: number,
	name?: string,
	score: number,
	goal: number,
}


interface IProps {
	/** Объект с информацией об игровом прогрессе (уровне) */
	progress: ProgressInfo,

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
	progress,
	withLevel,
	withName,
	withScore,
	className,
}) => {
	return (
		<div className={cn( styles, ['gameProgress'], className )}>
			{ withLevel && progress.level ?
				<div className={styles.levelNumber}>
					<span className={styles.levelText}>
						{progress.level}
					</span>
				</div>
				: ''
			}
			<div className={styles.progress}>
				<div className={styles.scheme}>
					{ withName && progress.name ?
						<div className={styles.levelName}>
							<span className={styles.nameText}>
								{progress.name}
							</span>
						</div>
						: ''
					}
					<ProgressBar
						value={progress.score / progress.goal}
						className={styles.progressBar} />
				</div>
				{ withScore ?
					<div className={styles.score}>
						<span className={styles.scoreText}>
							{progress.score}/{progress.goal}
						</span>
					</div>
					: ''
				}
			</div>
		</div>
	);
});


export default GameProgress;