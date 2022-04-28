import React from 'react';

interface IProp {
  imageURL: string;
  postTitle: string;
  userName: string;
}

const Card: React.FC<IProp> = ({ imageURL, postTitle, userName }) => {
  return (
    <div className="card w-2/5 bg-base-100 shadow-xl">
      <figure className="shadow-md rounded-xl">
        <img src={`images/` + imageURL} alt="Troll" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{postTitle}</h2>
        <div className="badge badge-secondary">{userName}</div>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
