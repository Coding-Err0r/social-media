import React, { useEffect, useState } from 'react';
import Card from '../utils/card';
import subscribe from '../../lib/subscribe';

import useSWR from 'swr';

const USER_SUBSCRIPTION = `
  subscription MySubscription {
    user_data(order_by: {created_at: desc}) {
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
  const subscribeData = async (...args: any[]) => {
    return subscribe(USER_SUBSCRIPTION);
  };
  const { data } = useSWR('subscription', subscribeData);
  const [postData, setPostData] = useState<any>([]);
  useEffect(() => {
    try {
      if (data !== undefined) {
        setPostData(data);
      }
    } catch (e) {}
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 p-6">
      {postData !== undefined &&
        postData.user_data?.map((post: any, i: any) => {
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
