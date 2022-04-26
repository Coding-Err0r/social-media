import React, { useState } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/solid';

const CreatePost = () => {
  const [post, setPost] = useState<string>('');
  const [imagePath, setImagePath] = useState<any | null>('');
  const [createObjectURL, setCreateObjectURL] = useState<any | null>(
    null
  );

  const handleURLConvertion = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImagePath(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const saveToPublicDir = async (event: any) => {
    const body = new FormData();
    body.append('file', imagePath);
    // body.append('file', post);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body
    });
  };

  return (
    <>
      <label htmlFor="my-modal" role="button">
        <PlusIcon className="w-7 h-7" />
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="my-modal"
            role="button"
            className="absolute right-2 top-2"
          >
            <XIcon className="w-7 h-7" />
          </label>

          <h3 className="font-bold text-lg">Create a new post</h3>

          <input
            type="text"
            placeholder="Come On Type Already ... 😒"
            className=" input input-bordered input-accent w-full max-w-2xl my-5 rounded-lg"
            onChange={(e) => setPost(e.target.value)}
          />

          {createObjectURL !== null ? (
            <img
              alt=""
              className="border-2 border-green-400 rounded-xl mb-5"
              src={createObjectURL}
            />
          ) : (
            <div className="m-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload Image(jpg,png,svg,jpeg)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a photo
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={handleURLConvertion}
                  />
                </label>
              </div>
            </div>
          )}
          <button
            className="btn btn-outline btn-success"
            onClick={saveToPublicDir}
          >
            POST
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
