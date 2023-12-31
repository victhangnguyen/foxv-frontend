import React from 'react';

const StarRegularIcon = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 574 512"
      width={size ? size : '1rem'}
      fill={color ? color : 'black'}
    >
      <g id="icon-star-regular">
        <path
          d="M287,0a24,24,0,0,1,21.61,13.52l68.61,141.31,153.33,22.7a23.94,23.94,0,0,1,13.4,40.71L432.69,328.46,459,484a24,24,0,0,1-9.7,23.5c-7.4,5.3-18.1,6-25.3,1.7L287,436,149.14,509.19c-7.2,4.3-17,3.6-24.51-1.7s-11.1-14.5-10.5-23.5l27.11-155.53L30.13,218.24a23.93,23.93,0,0,1,13.38-40.71l153.24-22.7L265.36,13.52A24.1,24.1,0,0,1,287,0Zm0,79L234.45,187.23a24.39,24.39,0,0,1-18.1,13.31L98,217.94l85.93,85.12a24.18,24.18,0,0,1,6.71,21.1L170.44,443.78l105.22-56.21a23.85,23.85,0,0,1,22.61,0l105.21,56.21-20.2-119.62a24.26,24.26,0,0,1,6.8-21.1L476,217.94l-118.32-17.4a24,24,0,0,1-18.11-13.31Z"
        />
      </g>
    </svg>
  );
};

export default StarRegularIcon;
