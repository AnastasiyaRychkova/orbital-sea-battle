type Device = 'desktop' | 'tablet' | 'mobile';

interface IBrowser
{
	preventTabClose(): void;
	permitTabClose(): void;

	onTabClose( callback: () => void ): void;

	device: Device;
}


export default IBrowser;