import { Namespace, Socket } from "socket.io";
import { cookie_id } from './properties.json';
import cookie from 'cookie';
import manager from './OBConnectionManager';

import type { IDType } from './types';

class OBGameConnection
{
	#root: Namespace;

	constructor( server: Namespace )
	{
		this.#root = server;
		this.#root.on( 'connection', this.newConnection );
	}

	newConnection( socket: Socket ): void
	{
		const uuid = OBGameConnection._getIdFromCookie( socket );
		if( uuid === undefined )
		{
			socket.disconnect( false );
			return;
		}
		manager.connect( uuid );
	}

	private static _getIdFromCookie( socket: Socket ): IDType
	{
		const cookieObj = cookie.parse(socket.request.headers.cookie || '');
		return cookieObj[ cookie_id ];
	}
}