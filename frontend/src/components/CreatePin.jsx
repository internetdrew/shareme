import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete, MdLabel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { client } from '../client';
import Spinner from './Spinner';
import { categories } from '../utils/data';

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
            console.log(document);
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
            {!imageAsset ? (
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
              <p>something else</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
