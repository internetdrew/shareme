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

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  const [randomImageUrl, setRandomImageUrl] = useState('');

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
