import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <h2 className='flex flex-col justify-center items-center w-full h-full'>
      <ThreeDots color='#EF4444' className='m-5' />
      <p className='text-lg text-center px-2'>{message}</p>
    </h2>
  );
};

export default Spinner;
