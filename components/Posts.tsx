import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post from './Post';

interface Props {}

const Posts: React.FC<Props> = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
