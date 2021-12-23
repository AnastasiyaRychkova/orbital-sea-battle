type Device = 'desktop' | 'tablet' | 'mobile';

interface IBrowser
{
	preventTabClose(): void;
	permitTabClose(): void;

	device: Device;
}


export default IBrowser;