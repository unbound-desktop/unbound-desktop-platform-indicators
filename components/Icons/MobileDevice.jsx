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
            d='M 15.5 1 L 7.5 1 C 6.119999885559082 1 5 2.119999885559082 5 3.5 L 5 19.5 C 5 20.8799991607666 6.119999885559082 22 7.5 22 L 15.5 22 C 16.8799991607666 22 18 20.8799991607666 18 19.5 L 18 3.5 C 18 2.119999885559082 16.8799991607666 1 15.5 1 Z M 11.5 21 C 10.670000076293945 21 10 20.329999923706055 10 19.5 C 10 18.670000076293945 10.670000076293945 18 11.5 18 C 12.329999923706055 18 13 18.670000076293945 13 19.5 C 13 20.329999923706055 12.329999923706055 21 11.5 21 Z M 16 17 L 7 17 L 7 4 L 16 4 L 16 17 Z '
         />
      </g>
   </svg>
);
