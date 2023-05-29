import React, { useCallback, useState } from 'react';
import styles from '../Buttons.module.css';
import IconButton from '../../Button/IconButton/Button';

import Browser from '../../../core/browser/Browser';


export default function FullScreenButton() {
	const [isFullScreen, setIsFullScreen] = useState( false );
	const toggle = useCallback( () => {
		setIsFullScreen( ( state ) => {
			state
				? Browser.fullScreen.off()
				: Browser.fullScreen.on();
			return !state;
		} );
	}, [] );

	return (
		<IconButton
			className={styles.small}
			glyph={isFullScreen ? 'reduce' : 'full_screen'}
			theme={'backing'}
			onClick={toggle}
		/>
	);
}
