import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex items-center w-full p-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          className='w-1/3 outline-none bg-white ml-2 p-1'
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
        />
      </div>
      <div className='flex gap-3'>
        <Link>
          <img
            src={user.image}
            alt='user'
            className='hidden w-12 hg-12 rounded-full md:inline-block'
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
