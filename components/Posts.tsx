import { IPost } from '../types';
import Post from './Post';

interface Props {}

const Posts: React.FC<Props> = () => {
  const posts: IPost[] = [
    {
      id: 1,
      username: 'bibi',
      userImg: 'https://i.pravatar.cc/300',
      img: 'https://images.unsplash.com/photo-1654599620402-176f0155372d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      caption: 'Awesome photo!',
    },
    {
      id: 2,
      username: 'kuro',
      userImg: 'https://i.pravatar.cc/300',
      img: 'https://images.unsplash.com/photo-1654714588210-b9a19d1f3d24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      caption: 'Wow!',
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
