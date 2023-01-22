import React, { useEffect } from 'react';
import { urlFor } from '../client';

const Pin = ({ pin: { postedBy, image, _id, destination } }) => {
  return (
    <img
      className='rounded-lg w-full'
      alt='user-post'
      src={urlFor(image).width(250).url()}
    />
  );
};

export default Pin;
