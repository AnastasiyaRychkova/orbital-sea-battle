import React, {FC} from 'react';
import styles from './styles.module.css';

interface IProps {
	children: React.ReactNode,
}

const Paragraph: FC<IProps> = ({
	children,
}) => {
	return (
		<p className={styles.paragraph}>
			<span className={styles.paragraphText}>
				{children}
			</span>
		</p>
	);
};

export default Paragraph;