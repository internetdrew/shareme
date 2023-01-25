import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete, MdLabel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { client } from '../client';
import Spinner from './Spinner';
import { categories } from '../utils/data';
import { BsCloudLightning } from 'react-icons/bs';

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [missingFields, setMissingFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = e => {
    const { type, name } = e.target.files[0];

    switch (type) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/svg':
      case 'image/gif':
      case 'image/tiff':
        setWrongImageType(false);
        setLoading(true);

        client.assets
          .upload('image', e.target.files[0], {
            contentType: type,
            filename: name,
          })
          .then(document => {
            setImageAsset(document);
            setLoading(false);
          })
          .catch(error => {
            console.log(`Image upload error: ${error}`);
          });
        break;
      default:
        setWrongImageType(true);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {missingFields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
          Please fill in all of the fields.
        </p>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center-bg-white lg:pd-5 pd-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner />}
            {wrongImageType && <p className='text-red-500'>Wrong image type</p>}
            {!imageAsset && !loading ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center hover:cursor-pointer'>
                    <p className='font-bold text-4xl'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>Click to upload</p>
                  </div>
                  <p className='mt-4 text-gray-400'>
                    Use high-quality JPG, SVG, PNG, GIF less than 20MB
                  </p>
                </div>
                <input
                  type='file'
                  name='upload-image'
                  onChange={uploadImage}
                  className='w-0 h-0'
                />
              </label>
            ) : (
              <div className='relative h-full'>
                {imageAsset && !loading && (
                  <>
                    <img
                      src={imageAsset?.url}
                      alt='uploaded-pic'
                      className='h-full w-full'
                    />
                    <button
                      type='button'
                      className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                      onClick={() => setImageAsset(null)}
                    >
                      <MdDelete />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Add your title here'
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />
          {user && (
            <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
              <img
                src={user?.image}
                alt='user-image'
                className='w-10 h-10 rounded-full'
              />
              <p className='font-bold'>{user?.userName}</p>
            </div>
          )}
          <input
            type='text'
            value={about}
            onChange={e => setAbout(e.target.value)}
            placeholder='What is your pin about?'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <input
            type='text'
            value={destination}
            onChange={e => setDestination(e.target.value)}
            placeholder='Add a destination link'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <div className='flex flex-col'>
            <div>
              <p className='mb-2 font-semibold text-lg sm:text-xl'>
                Choose pin category
              </p>
              <select
                onChange={e => setCategory(e.target.value)}
                className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer form-select appearance-none'
              >
                <option value='other' className='bg-white'>
                  Select Category
                </option>
                {categories.map(category => (
                  <option
                    className='text-base capitalize border-0 outline-none bg-white text-black'
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
