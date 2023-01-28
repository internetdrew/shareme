import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from '../utils/data';
import { client } from '../client';
import MasonryLayout from 'react-masonry-css';
import Spinner from './Spinner';
import { createApi } from 'unsplash-js';

const activeBtnStyles =
  'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none select-none';
const inactiveBtnStyles =
  'bg-primary-500 mr-4 text-black font-bold p-2 rounded-full w-20 outline-none select-none';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  const [randomImageUrl, setRandomImageUrl] = useState('');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const getRandomImage = async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos/?client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }`
      );
      const randomImages = await res.json();
      const extractedUrls = randomImages.map(
        image => `${image.urls.regular}&w=1600&h=900`
      );
      const randomUrl =
        extractedUrls[Math.floor(Math.random() * extractedUrls.length)];
      setRandomImageUrl(randomUrl);
    };

    getRandomImage();
  }, []);

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then(data => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then(data => setPins(data));
      return;
    }

    const savedPinsQuery = userSavedPinsQuery(userId);
    client.fetch(savedPinsQuery).then(data => setPins(data));
  }, [text, userId]);

  if (!user) {
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
              src={user.image}
              alt='user-pic'
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>
            <div className='absolute top-2 z-1 right-1 p-2'>
              {userId === user._id && (
                <button
                  type='button'
                  className='g_id_signout w-fit bg-white py-2 px-4 rounded-full outline-none shadow-md opacity-90 cursor-pointer active:scale-95 select-none flex gap-2 items-center justify-center font-medium'
                  onClick={logout}
                >
                  <AiOutlineLogout /> <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button
              type='button'
              onClick={e => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              className={`${
                activeBtn === 'created' ? activeBtnStyles : inactiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={e => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
              className={`${
                activeBtn === 'saved' ? activeBtnStyles : inactiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>

          {pins?.length && (
            <div className='px-2 items-center'>
              <MasonryLayout pins={pins} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
