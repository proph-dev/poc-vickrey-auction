import React from 'react';
import style from './loading.module.scss';

interface LoadingProps {
  width?: number;
  height?: number;
  full?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ width = 64, height = 64, full = false }) => {
  const spinnerSize = {
    width: `${width}px`,
    height: `${height}px`
  };

  return full ? (
    <div className={style.fullLoader}>
      <div className={style.loader}>
        <div className={style.secondCircle} style={spinnerSize}></div>
        <div className={style.mainCircle} style={spinnerSize}></div>
      </div>
    </div>
  ) : (
    <div className={style.loader}>
      <div className={style.secondCircle} style={spinnerSize}></div>
      <div className={style.mainCircle} style={spinnerSize}></div>
    </div>
  );
};
