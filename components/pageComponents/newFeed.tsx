import React, { useEffect, useState } from 'react';
import Card from '../utils/card';
import { useQuery, gql } from '@apollo/client';

const POSTSUBSCRIPTION = gql`
  subscription MySubscription {
    user_data {
      image
      post
      user {
        name
      }
      created_at
    }
  }
`;

const NewFeed = () => {
  const { data, loading, error } = useQuery(POSTSUBSCRIPTION);
  const [postData, setPostData] = useState<any[] | undefined>([]);
  useEffect(() => {
    try {
      console.log(data);
      setPostData(data.user_data);
    } catch (e) {}
  }, [data]);
  return (
    <div className="flex flex-col justify-center items-center gap-y-6 p-6">
      {postData !== undefined &&
        postData.map((post: any, i) => {
          return (
            <Card
              imageURL={post.image}
              postTitle={post.post}
              userName={post.user.name}
              key={i}
            />
          );
        })}
    </div>
  );
};

export default NewFeed;
