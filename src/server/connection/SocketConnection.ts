import { Server } from "socket.io";
/* import { Namespace, Server, ServerOptions, Socket } from "socket.io";

class SocketConnection {

	protected server: Server;

	constructor( server: any, opt: ServerOptions, nsp: string | RegExp | ((name: string, query: object, fn: (err: Error, success: boolean) => void) => void), fn?: ((socket: Socket) => void) | undefined ) {
		this.server = new Server( server, opt );
	}

	protected send( event: string, ...args: any[] ): Namespace
	{
		this.emit( event, ...args );
		return this.nsp;
	}

	protected addListener( event: string, listener: ( socket: Socket ) => void ): Namespace
	{
		return this.nsp.on( event, listener );
	}

}

export default SocketConnection; */

function makeOptions( options: object ): object
{
	const defaultOptions = {};

	return Object.assign( defaultOptions, options );
}


export function createSocketServer( server: any, opt: Object )
{
	const socketServer = new Server( server, makeOptions( opt ) );
	return socketServer;
}
