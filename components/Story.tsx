import React from 'react';
import { StoryUser } from '../types';

interface Props {
  user: StoryUser;
}

const Story: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <img
        src={user.img}
        alt={user.username}
        className="h-14 w-14 cursor-pointer rounded-full border-2 border-red-500 p-[1.5px] transition-transform duration-200 ease-out hover:scale-110"
      />
      <p className="w-14 truncate text-xs">{user.username}</p>
    </div>
  );
};

export default Story;
