import React, {FC} from 'react';
import cn from '../../className';
import styles from './styles.module.css';

interface IProps {
	style?: string,
	children: React.ReactNode,
}

const Paragraph: FC<IProps> = ({
	style,
	children,
}) => {
	return (
		<p className={cn(styles, ['paragraph', style])}>
			<span className={styles.paragraphText}>
				{children}
			</span>
		</p>
	);
};

export default Paragraph;