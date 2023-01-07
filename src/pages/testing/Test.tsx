import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Button from '../../components/Button/Default/Button';
import ButtonWithIcon from '../../components/Button/WithIcon/Button';
import IconButton from '../../components/Button/IconButton/Button';
import DropSidedInfo from '../../components/DropSidedInfo/DropSidedInfo';
import GameProgress from '../../components/GameProgress/GameProgress';
import MiniInfo from '../../components/MiniInfo/MiniInfo';

import './components.css';
import '../../style/root.css';


const Test = () => {
	return (
		<Router>
			<div className="test">
				<section className="tasks">
					<div className="row">
						<div className="column tasks">
							<DropSidedInfo
								message="Выберете 2 ряд диаграммы"
								comment="Используйте панель внизу экрана"
							/>
						</div>
						<div className="column mini-infos">
							<MiniInfo
								provider="2/5"
								caption="выстрелов"
								glyph="shot"
							/>
						</div>
					</div>
				</section>
				<section className="progress">
					<div className="row">
						<div className="column">
							<GameProgress />
							<GameProgress withScore />
							<GameProgress withLevel />
							<GameProgress withName />
							<GameProgress withLevel withScore />
							<GameProgress withLevel withName />
							<GameProgress withScore withName />
						</div>
					</div>
				</section>
				<section className="buttons">
					<div className="row">
						<div className="column">
							<Button value="Button" priority="primary" />
							<Button value="Button" priority="secondary" />
						</div>
						<div className="column">
							<ButtonWithIcon
								value="Приоритетное действие"
								priority="primary"
								glyph="info"
							/>
							<ButtonWithIcon
								value="Альтернативное действие"
								priority="secondary"
								glyph="info"
							/>
							<ButtonWithIcon
								value="Альтернативное действие"
								priority="secondary"
								glyph="info"
							/>
							<ButtonWithIcon
								value="Альтернативное действие"
								priority="tertiary"
								glyph="info"
							/>
						</div>
						<div className="column">
							<IconButton glyph="cross" className="icon-button" />
							<IconButton
								glyph="cross"
								className="icon-button"
								theme="inversive"
							/>
							<IconButton
								glyph="cross"
								theme="backing"
								className="icon-button"
							/>
						</div>
					</div>
				</section>
			</div>
		</Router>
	);
};

export default Test;
