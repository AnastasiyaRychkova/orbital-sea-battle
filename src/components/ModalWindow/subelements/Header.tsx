import React, {FC} from 'react';
import styles from './styles.module.css';

interface IProps {
	children: React.ReactNode,
}

const Header: FC<IProps> = ({children}) => {
	return (
		<h2 className={styles.header}>
			<span className={styles.headerText}>
				{children}
			</span>
		</h2>
	);
};

export default Header;