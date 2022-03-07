import { bulk, filters } from '@webpack';

import { React, Flux } from '@webpack/common';
import { RelativeTooltip } from '@components';
import { capitalize } from '@utilities';
import Icons from './Icons/index.js';

const [
   fingerprint,
   statusStore,
   statusModule,
   classes
] = bulk(
   filters.byProps('initialize', 'getFingerprint'),
   filters.byProps('isMobileOnline'),
   filters.byProps('getStatusColor'),
   filters.byProps('member', 'ownerIcon')
);

import clientStatusStore from '../stores/client';
const clientIcons = Object.freeze({
   web: Icons.Public,
   desktop: Icons.Monitor,
   mobile: Icons.MobileDevice
});

function renderClientStatus(client, props, states) {
   if (client == 'unknown') return null;

   const device = capitalize(client);
   const status = states.activeSessions[client];

   const color = statusModule.getStatusColor(status);
   const Icon = clientIcons[client];

   return (
      <RelativeTooltip
         text={device}
         position={props.tooltipPosition ?? 'top'}
         hideOnClick={false}
      >
         {(props) => (
            <Icon
               color={color}
               className={`bsi-${client}-icon ${classes.icon}`}
               data-bsi-status={status}
               {...props}
            />
         )}
      </RelativeTooltip>
   );
}

function shouldClientStatusRender(client, props) {
   if (props.user.bot) {
      return false;
   }

   const self = props.user.id === fingerprint.getId();
   const clientStatus = self ? clientStatusStore.getCurrentClientStatus() : statusStore.getState().clientStatuses[props.user.id];
   if (!clientStatus) {
      return false;
   }

   return true;
}

function getActiveSessions(userId) {
   const isCurrentUser = userId === fingerprint.getId();
   const activeSessions = isCurrentUser ? clientStatusStore.getCurrentClientStatus() : statusStore.getState().clientStatuses[userId];

   return activeSessions || {};
}

export default React.memo(props => {
   if (!props.user) {
      return null;
   }

   const states = Flux.useStateFromStoresObject([statusStore], () => ({
      statusColor: statusModule.getStatusColor(props.status || statusStore.getStatus(props.user.id)),
      activeSessions: getActiveSessions(props.user.id)
   }));

   const platforms = Object.keys(states.activeSessions).filter(p => shouldClientStatusRender(p, props));
   if (platforms.length === 0) {
      return null;
   }

   const statuses = [];

   platforms.sort().forEach(platform => statuses.push(renderClientStatus(platform, props, states)));

   return (
      <div className='bsi-client-statuses'>
         {statuses}
      </div>
   );
});
