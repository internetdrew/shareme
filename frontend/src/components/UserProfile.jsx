import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { RiH2 } from 'react-icons/ri';

const activeBtnStyles =
  'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none select-none';
const inactiveBtnStyles =
  'bg-primary-500 mr-4 text-black font-bold p-2 rounded-full w-20 outline-none select-none';

const UserProfile = () => {
  const [activeBtn, setActiveBtn] = useState('created');

  const navigate = useNavigate();
  const { userId } = useParams();

  const { data: userData } = useQuery(['user'], async () => {
    const query = userQuery(userId);
    const data = await client.fetch(query);
    return data[0];
  });

  const { data: images } = useQuery(['images'], async () => {
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${
        import.meta.env.VITE_UNSPLASH_ACCESS_KEY
      }`
    );
    return res.json();
  });

  const randomImageUrl = `${images?.[0]?.urls.regular}&w=1600&h=900`;

  const { data: userCreatedPins } = useQuery(['createdPins'], async () => {
    const createdPinsQuery = userCreatedPinsQuery(userId);
    const data = await client.fetch(createdPinsQuery);
    return data;
  });

  const { data: userSavedPins } = useQuery(['savedPins'], async () => {
    const savedPinsQuery = userSavedPinsQuery(userId);
    const data = await client.fetch(savedPinsQuery);
    return data;
  });

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!userData) {
    return <Spinner message='Loading profile...' />;
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={randomImageUrl}
              alt='banner-pic'
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
            />
            <img
              src={userData.image}
              alt='user-pic'
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {userData.userName}
            </h1>
            <div className='absolute top-2 z-1 right-1 p-2'>
              {userId === userData._id ? (
                <button
                  type='button'
                  className='g_id_signout w-fit bg-white py-2 px-4 rounded-full outline-none shadow-md opacity-90 cursor-pointer active:scale-95 select-none flex gap-2 items-center justify-center font-medium'
                  onClick={logout}
                >
                  <AiOutlineLogout /> <span>Sign Out</span>
                </button>
              ) : null}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button
              type='button'
              onClick={() => setActiveBtn('created')}
              className={`${
                activeBtn === 'created' ? activeBtnStyles : inactiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={() => setActiveBtn('saved')}
              className={`${
                activeBtn === 'saved' ? activeBtnStyles : inactiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          <div className='px-2 items-center'>
            <MasonryLayout
              pins={activeBtn === 'created' ? userCreatedPins : userSavedPins}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
