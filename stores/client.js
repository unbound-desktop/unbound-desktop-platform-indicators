import { getByProps } from '@webpack';

import { Flux, Dispatcher } from '@webpack/common';
const { getSessions } = getByProps('getSessions') || {};

let currentClientStatus = Object.values(getSessions()).reduce((sessions, session) => {
   sessions[session.clientInfo.client] = session.status;
   return sessions;
}, {});

function handleCurrentClientStatus(sessions) {
   currentClientStatus = Object.assign({}, ...sessions.map(session => ({ [session.clientInfo.client]: session.status })));
}

class ClientStatusStore extends Flux.Store {
   getCurrentClientStatus() {
      return currentClientStatus;
   }
}

export default new ClientStatusStore(Dispatcher, {
   SESSIONS_REPLACE: ({ sessions }) => handleCurrentClientStatus(sessions)
});
