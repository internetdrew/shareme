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

  // if (!user) {
  //   return <Spinner message='Loading profile...' />;
  // }

  useEffect(() => {
    console.log('here');
    const query = userQuery(userId);

    client.fetch(query).then(data => {
      setUser(data[0]);
      console.log(user);
    });
  }, [userId]);

  return <div>UserProfile</div>;
};

export default UserProfile;
