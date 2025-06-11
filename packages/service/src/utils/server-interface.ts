import { Server, IncomingMessage, ServerResponse } from 'http';

export type ServerWithClose = Server<typeof IncomingMessage, typeof ServerResponse> & {
  close: () => void;
};
