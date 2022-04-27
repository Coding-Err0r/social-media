import React, { useState, useEffect } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/solid';
import {
  useLazyQuery,
  gql,
  useMutation,
  useQuery
} from '@apollo/client';
import { useUser } from '@clerk/nextjs';

const INSERTDATA = gql`
  mutation Insert_User_Data(
    $image: String!
    $post: String!
    $user_id: uuid!
  ) {
    insert_user_data_one(
      object: { image: $image, post: $post, user_id: $user_id }
    ) {
      created_at
    }
  }
`;

const INSERTUSER = gql`
  mutation ($email: String!, $name: String!) {
    insert_users_one(object: { email: $email, name: $name }) {
      id
    }
  }
`;

const SELECT = gql`
  query GetAllUsersEmail {
    users {
      email
      id
    }
  }
`;

const CreatePost = () => {
  const [post, setPost] = useState<string>('');
  const [imagePath, setImagePath] = useState<any | null>('');
  const [createObjectURL, setCreateObjectURL] = useState<any | null>(
    null
  );
  const [insert_user_data_one] = useMutation(INSERTDATA);
  const handleURLConvertion = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImagePath(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const saveToPublicDir = async (event: any) => {
    const temp = new Date().toLocaleString();
    const dateTime = temp.replace(/[^\w\s]/gi, '_');
    const uploadFileName = dateTime + imagePath.name;
    if (responseData !== undefined) {
      responseData.map((user: any) => {
        if (user.email === userEmail) {
          insert_user_data_one({
            variables: {
              image: uploadFileName,
              post: post,
              user_id: user.id
            }
          })
            .then(() => {
              setPost('');
              setImagePath('');
              console.log('Inserted Users Post Data');
            })
            .catch((e: any) => {});
        }
      });
    }
    const body = new FormData();
    body.append('file', imagePath);
    body.append('fileName', uploadFileName);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body
    });
  };

  const { user }: any = useUser();
  const [insert_users_one] = useMutation(INSERTUSER);
  const { loading, error, data } = useQuery(SELECT);
  const [responseData, setResponseData] = useState<
    any[] | undefined
  >();

  let userEmail = user.primaryEmailAddress?.emailAddress;
  let userName = user.fullName;
  useEffect(() => {
    try {
      setResponseData(data.users);
    } catch (e: any) {}
  }, [loading]);

  useEffect(() => {
    if (responseData !== undefined) {
      responseData.map((user: any) => {
        if (user.email === userEmail) {
          console.log('Email Exist');
        } else {
          if (userEmail !== null && userName !== null) {
            insert_users_one({
              variables: {
                email: userEmail,
                name: userName
              }
            })
              .then(() => {
                console.log('Inserted Data');
              })
              .catch((e: any) => {});
          } else {
            console.log('Failed To Insert');
          }
        }
      });
    } else {
      console.log('No Data Found');
    }
  }, [responseData !== undefined]);

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
