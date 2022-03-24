import { Flux, Dispatcher } from '@webpack/common';
import { getByProps } from '@webpack';

const { getSessions } = getByProps('getSessions') || {};

let store = Object.values(getSessions()).reduce((sessions, session) => {
   sessions[session.clientInfo.client] = session.status;
   return sessions;
}, {});

class ClientStatusStore extends Flux.Store {
   getCurrentClientStatus() {
      return store;
   }
}

export default new ClientStatusStore(Dispatcher, {
   SESSIONS_REPLACE: ({ sessions }) => {
      store = Object.assign({}, ...sessions.map(session => ({
         [session.clientInfo.client]: session.status
      })));
   }
});
