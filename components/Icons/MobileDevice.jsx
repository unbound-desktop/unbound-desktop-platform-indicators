import { React } from '@webpack/common';
const Lodash = window._;

export default React.memo((props) =>
   <svg
      {...Lodash.omit(props, ['width', 'height', 'color', 'foreground'])}
      aria-hidden={props['aria-hidden'] ?? false}
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox='0 0 24 24'
   >
      <g fill='none' fill-rule='evenodd'>
         <path
            className={props.foreground}
            fill={props.color ?? 'currentColor'}
            d='M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83  0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z'
         />
      </g>
   </svg>
);
