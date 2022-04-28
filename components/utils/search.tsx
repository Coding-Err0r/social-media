import React, { useEffect, useState } from 'react';
import { request, RequestDocument } from 'graphql-request';
import useSWR from 'swr';
import SearchResult from './searchResult';

const Search = () => {
  const [userName, setUserName] = useState<string>('');
  const [searchData, setSearchData] = useState<any[] | undefined>([]);
  const variables = { name: userName };
  const fetcher = (query: any, variables: any) =>
    request(
      String(process.env.NEXT_PUBLIC_HASURA_URL),
      query,
      variables
    );
  const { data, error } = useSWR(
    [
      `query MyQuery($name:String!) {
      user_data(where: {user: {name: {_ilike: $name}}}) {
        post
        image
        created_at
        user {
          name
        }
      }
    }
`,
      { name: userName }
    ],
    fetcher
  );

  useEffect(() => {
    try {
      setSearchData(data.user_data);
    } catch (e) {}
  }, [data]);
  console.log(searchData);
  return (
    <>
      <div className="flex-auto z-30">
        <div className="">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-96"
            onChange={(e: any) => setUserName(e.target.value)}
            tabIndex={0}
          />
        </div>
      </div>
      <div className="flex flex-col absolute left-0 right-0 top-0 bottom-0 m-auto pt-20">
        {searchData !== undefined && searchData?.length > 0
          ? searchData.map((data:any, i: any) => {
              return (
                <SearchResult
                  title={data.post}
                  image={data.image}
                  user={data.user?.name}
                  created_at={data.created_at}
                  key={i}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

export default Search;
