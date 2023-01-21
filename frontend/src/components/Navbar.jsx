import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-8'>
      <div className='flex p-2 rounded-md bg-white items-center border-none outline-none focus-within:shadow-sm grow'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          className='w-1/2 outline-none bg-white ml-2 p-1'
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
        />
      </div>
      <div className='flex items-center justify-end gap-2'>
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
          <img src={user.image} alt='user' className='w-12 rounded-full' />
        </Link>
        <Link
          to='/create-pin'
          className='bg-black text-white flex justify-center items-center w-12 h-12 rounded-full'
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
