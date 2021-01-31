import { io } from "../../lib/third-party/socket.io";
import prop from './properties';
import { InputMessage, OutputMessage } from "../../lib/game/types";

let socket: SocketIOClient.Socket | undefined;


export function connect( callback: Function ): void
{
	socket = io( prop.url );
	socket?.on( 'connect', callback );
}

export function addConnectionListener( event: InputMessage, fn: Function ): void
{
	socket?.on( event, fn );
}

export function send( event: OutputMessage, ...args: any[] ): void 
{
	socket?.emit( event, ...args );
}
