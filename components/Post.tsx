import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { IPost } from '../types';

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <article className="my-7 rounded-md border bg-white">
      <header className="flex items-center p-5">
        <img
          src={post.userImg}
          alt={post.username}
          className="mr-3 h-12 w-12 rounded-full border object-cover p-1"
        />
        <p className="flex-1 font-bold">{post.username}</p>
        <DotsHorizontalIcon className="h-5 w-5" />
      </header>

      <img
        src={post.img}
        alt={post.caption}
        className="h-auto w-full object-cover"
      />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex items-center space-x-4">
          <HeartIcon className="postButton" />
          <ChatIcon className="postButton" />
        </div>

        <BookmarkIcon className="postButton" />
      </div>

      <div className="flex items-center space-x-2 truncate p-5">
        <p className="font-bold">{post.username}</p>
        <p>{post.caption}</p>
      </div>

      <div className="">
        <form>
          <div className="flex items-center p-4">
            <EmojiHappyIcon className="mr-2 h-7 w-7" />
            <input
              type="text"
              placeholder="Enter your comment..."
              className="mr-5 grow border-none focus:ring-black"
            />
            <button className="ml-auto font-bold text-blue-400">Post</button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Post;
