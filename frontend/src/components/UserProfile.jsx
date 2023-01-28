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

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  const randomImage =
    'https://source.unsplash.com/1600*900/?nature,photography,technology';

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then(data => {
      setUser(data[0]);
      console.log(user);
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
            <img src={randomImage} alt='' className='w-full h-370 2xl:h' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
