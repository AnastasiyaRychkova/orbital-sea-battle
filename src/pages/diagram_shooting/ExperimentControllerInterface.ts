import Experiment from "./Experiment";
import type { FormName } from "./FormHelper";

interface IExperimentController
{
	experiment: Experiment;

	getFormURL( formName: FormName ): string
}


export default IExperimentController;