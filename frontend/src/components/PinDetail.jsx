import React, { useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import { BsCheckLg } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';

const PinDetail = ({ user }) => {
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if (comment.trim()) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user?._id,
            },
          },
        ])
        .commit()
        .then(() => {
          setComment('');
          setAddingComment(false);
        });
    }
  };
  const query = pinDetailQuery(pinId);

  const { data: pinDetails } = useQuery(['pinDetails', pinId], async () => {
    const data = await client.fetch(query);
    return data[0];
  });

  const morePinsQuery = useQuery(
    ['morePins'],
    async () => {
      const moreQuery = pinDetailMorePinQuery(pinDetails);
      const data = await client.fetch(moreQuery);
      return data;
    },
    { enabled: !!pinDetails }
  );

  if (!pinDetails) return <Spinner message='Loading pin details...' />;

  return (
    <>
      <div
        className='flex xl:flex-row flex-col m-auto bg-white'
        style={{ maxWidth: '1500px', borderRadius: '32px' }}
      >
        <div className='flex justify-center items-center flex-initial md:items-start'>
          <img
            src={pinDetails?.image && urlFor(pinDetails.image).url()}
            alt={pinDetails?.about}
            className='rounded-t-3xl rounded-b-lg'
          />
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a
                href={`${pinDetails?.image?.asset.url}?dl=`}
                download
                onClick={e => e.stopPropagation()}
                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetails?.destination} target='_blank' rel='nonreferrer'>
              {pinDetails?.destination}
            </a>
          </div>
          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
              {pinDetails.title}
            </h1>
            <p className='mt-3'>{pinDetails?.about}</p>
          </div>
          <Link
            to={`/user-profile/${pinDetails?.postedBy?._id}`}
            className='flex gap-2 mt-5 items-center bg-white rounded-lg'
          >
            <img
              src={pinDetails?.postedBy?.image}
              alt=''
              className='w-8 h-8 rounded-full object-cover'
            />
            <p className='font-semibold capitalize'>
              {pinDetails?.postedBy?.userName}
            </p>
          </Link>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='max-h-370 overflow-y-auto'>
            {pinDetails?.comments?.map((comment, i) => (
              <div
                className='flex gap-2 mt-5 items-center bg-white rounded-lg'
                key={i}
              >
                <Link to={`/user-profile/${comment?.postedBy?._id}`}>
                  <img
                    src={comment?.postedBy?.image}
                    alt='user-profile'
                    className='w-10 h-10 rounded-full cursor-pointer'
                  />
                </Link>
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment?.postedBy?.userName}</p>
                  <p>{comment?.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap items-center mt-6 gap-3'>
            <Link to={`/user-profile/${pinDetails?.postedBy?._id}`}>
              <img
                src={pinDetails?.postedBy?.image}
                alt=''
                className='w-8 h-8 rounded-full cursor-pointer'
              />
            </Link>
            <input
              type='text'
              className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
              placeholder='Add a comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button
              type='button'
              className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
              onClick={addComment}
            >
              {addingComment ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {morePinsQuery?.data?.length ? (
        <>
          <h2 className='text-center font-bold text-2x mt-8 mb-4'>
            More like this...
          </h2>
          <MasonryLayout pins={morePinsQuery.data} />
        </>
      ) : (
        <div className='flex justify-center font-bold items-center w-full text-xl mt-8'>
          No pins found.
        </div>
      )}
    </>
  );
};

export default PinDetail;
