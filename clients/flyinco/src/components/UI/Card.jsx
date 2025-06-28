import React from 'react';
import classNames from 'classnames';

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={classNames(
        'bg-white dark:bg-gray-900 rounded-xl shadow-md p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
