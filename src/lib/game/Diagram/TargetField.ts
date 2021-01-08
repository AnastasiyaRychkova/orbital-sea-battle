import DiagramState from './DiagramState';
import Field from './Field'

/** Обновляемое игровое поле с возможностью фильтра */
export class TargetField extends Field
{
    
    /**
	 * Устанавливает конфигурацию игрового поля
	 * @param state Состояние диаграммы
	 */
	setState( state: DiagramState ): void
	{
        super.setState( state );
        //
    }
    
    //
}