import { connectComponent } from '@api/settings';
import { React, Flux } from '@webpack/common';
import { findByProps } from '@webpack';
import { uuid } from '@utilities';

const ReactHooks = {
   Spring: findByProps('useSpring'),
   Basic: findByProps('useLazyValue')
};

const classes = findByProps('wrapper', 'avatar');
const Status = findByProps('getStatusMask');

const config = { tension: 600, friction: 70 };

const AnimatedStatus = React.memo(props => {
   const { status, className, style } = props;
   const { Spring, Basic } = ReactHooks;

   const isMobile = props.isMobile !== void 0 && props.isMobile;
   const color = props.color ? props.color : Status.getStatusColor(status);
   const size = props.size ? props.size : 8;

   const statusValues = React.useMemo(() => Status.getStatusValues({ size, status, isMobile }), [size, status, isMobile]);
   const statusDimensions = Spring.useSpring({ config, to: statusValues });
   const statusHeight = Math.ceil(size * 1.5);
   const statusColor = Spring.useSpring(
      { config, fill: color },
      [color]
   )[0].fill;

   const maskId = Basic.useLazyValue(() => uuid());
   const statusMask = Status.renderStatusMask(statusDimensions, size, maskId);

   return React.createElement('svg', {
      width: size,
      height: statusHeight,
      viewBox: `0 0 ${size} ${statusHeight}`,
      className: [classes.mask, className].filter(Boolean).join(' '),
      'data-bsi-status': status,
      style
   }, statusMask, React.createElement(Spring.animated.rect, {
      x: 0,
      y: 0,
      width: size,
      height: statusHeight,
      fill: statusColor,
      mask: `url(#${maskId})`
   }));
});

export default connectComponent(AnimatedStatus, 'better-status-indicators');;
