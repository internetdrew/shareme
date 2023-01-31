import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery, userQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm, setSearchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim()) {
      setLoading(true);
      setPins(null);

      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then(data => {
        setPins(data);
        setLoading(false);
      });
    }

    if (!searchTerm.trim()) {
      client.fetch(feedQuery).then(data => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message='Searching for pins...' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {(!pins || pins?.length === 0) && searchTerm !== '' && !loading && (
        <div className='mt-10 text-center text-xl'>Pins Not Found</div>
      )}
    </div>
  );
};

export default Search;
