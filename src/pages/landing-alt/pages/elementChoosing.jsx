import ElementSelectionWindow from './modules/ElementSelectionWindow/ElementSelectionWindow.jsx'
import styleExitButton from './modules/buttons/ExitButton/ExitButton.scss'
import stylesButton from './modules/buttons/Button.module.scss';
import bodyStyle from './components/body2.module.css' 

const ElementChoosing = () =>{
	return (
    <body className={bodyStyle.body2}>
      <div className="interface">
                <button className="icon-scaling button-icon">
                  <img src="img/choosing/scale.svg" alt=""/>
                </button>
      </div>
      <ElementSelectionWindow></ElementSelectionWindow>

      <div className="wrapper-bottom">
        <button 
          extraStyles={styleExitButton}
          >
          <img className={stylesButton['icon-tiny']} src="/img/choosing/exit.svg"/><span>сдаться и выйти</span>
        </button>
      </div>
    </body>
    )
}

export default ElementChoosing;