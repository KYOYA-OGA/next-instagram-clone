import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Moment from 'react-moment';

interface Props {
  post: DocumentData;
}

const Post: React.FC<Props> = ({ post }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'posts', post.id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, [db, post.id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', post.id, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    const checkAlreadyLiked = likes.findIndex(
      (like) => like.id === session?.user.uid
    );
    if (checkAlreadyLiked !== -1) setHasLiked(true);
  }, [likes]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, 'posts', post.id, 'comments'), {
      comment,
      username: session?.user.username,
      userImage: session?.user.image,
      timestamp: serverTimestamp(),
    });
    setComment('');
  };

  const handleLike = async () => {
    const userId = session?.user.uid;

    if (userId) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', post.id, 'likes', userId));
        setHasLiked(false);
      } else {
        await setDoc(doc(db, 'posts', post.id, 'likes', userId), {
          username: session?.user.username,
        });
        setHasLiked(true);
      }
    }
  };

  return (
    <article className="my-7 rounded-md border bg-white">
      <header className="flex items-center space-x-2 p-5">
        <Image
          src={post.data().profileImg}
          alt={post.data().username}
          className="mr-3 h-12 w-12 rounded-full border object-cover p-1"
          width={48}
          height={48}
        />
        <p className="flex-1 font-bold">{post.data().username}</p>
        <DotsHorizontalIcon className="h-5 w-5" />
      </header>

      <div className="relative h-64 w-full md:h-96">
        <Image
          src={post?.data().image || '/placeholder.jpeg'}
          alt={post?.data().caption || ''}
          className="absolute h-full w-full"
          objectFit="contain"
          layout="fill"
          priority
        />
      </div>

      {/* Post Icons */}
      {session ? (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex items-center space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={handleLike}
                className="postButton text-red-400"
              />
            ) : (
              <HeartIcon onClick={handleLike} className="postButton" />
            )}
            <ChatIcon className="postButton" />
            {likes.length > 0 ? (
              <p className="">
                {likes.length} like{likes.length > 1 && 's'}
              </p>
            ) : null}
          </div>

          <BookmarkIcon className="postButton" />
        </div>
      ) : null}

      {/* Post comments list  */}

      <div className="mt-2 flex items-center space-x-2 truncate p-5">
        <p className="font-bold">{post.data().username}</p>
        <p>{post.data().caption}</p>
      </div>

      {comments.length > 0 ? (
        <div className="mx-10 max-h-24 space-y-2 overflow-y-scroll scrollbar-none">
          {comments.map((item) => {
            return (
              <div key={item.id} className="flex items-center space-x-2">
                <Image
                  src={item.data().userImage}
                  alt={item.data().username}
                  className="h-7 w-7 rounded-full border object-cover p-1"
                  width={28}
                  height={28}
                />
                <p className="font-semibold">{item.data().username}</p>
                <p className="flex-1 truncate">{item.data().comment}</p>
                <Moment fromNow>{item.data().timestamp?.toDate()}</Moment>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Post comments input */}
      {session ? (
        <div className="">
          <form onSubmit={handleCommentSubmit}>
            <div className="flex items-center p-4">
              <EmojiHappyIcon className="mr-2 h-7 w-7" />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Enter your comment..."
                className="mr-5 grow rounded border-none focus:ring-black"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="ml-auto font-bold text-blue-400 disabled:cursor-not-allowed disabled:text-gray-200"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </article>
  );
};

export default Post;
