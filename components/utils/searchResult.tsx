import React from 'react';

interface IProps {
  title: string;
  image: string;
  user: string;
  created_at: string;
}
const SearchResult: React.FC<IProps> = ({
  title,
  image,
  user,
  created_at
}) => {
  return (
    <div className="z-20 mt-5 -ml-32">
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96 border-2 border-green-500"
      >
        <li>
          <h3>{title}</h3>
          <div className="flex">
            <img
              src={`images/` + image}
              alt=""
              className="w-36 h-20"
            />
            <p className="adge badge-accent badge-outline">{user}</p>
          </div>
          <p>{created_at}</p>
        </li>
      </ul>
    </div>
  );
};

export default SearchResult;
