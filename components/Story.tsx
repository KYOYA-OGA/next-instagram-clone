import { PlusIcon } from '@heroicons/react/solid';
import React from 'react';
import { StoryUser } from '../types';

interface Props {
  user: StoryUser;
  isAdmin: boolean;
}

const Story: React.FC<Props> = ({ user, isAdmin }) => {
  return (
    <div className="group relative cursor-pointer">
      <img
        src={user.img}
        alt={user.username}
        className="h-14 w-14 cursor-pointer rounded-full border-2 border-red-500 p-[1.5px] transition-transform duration-200 ease-out group-hover:scale-110"
      />
      {isAdmin ? (
        <PlusIcon className="absolute top-3 left-3 h-8 w-8 text-white" />
      ) : null}
      <p className="w-14 truncate text-xs">{user.username}</p>
    </div>
  );
};

export default Story;
