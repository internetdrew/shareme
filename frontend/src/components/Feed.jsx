import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const { categoryId } = useParams();

  const query = categoryId ? searchQuery(categoryId) : feedQuery;

  const pinsQuery = useQuery(['pins', categoryId], async () => {
    const data = await client.fetch(query);
    return data;
  });

  if (pinsQuery.isLoading) {
    return <Spinner message='Adding new ideas to your feed...' />;
  }

  if (!pinsQuery?.data?.length)
    return <h2 className='flex justify-center'>No pins available... yet</h2>;

  return <div>{<MasonryLayout pins={pinsQuery.data} />}</div>;
};

export default Feed;
