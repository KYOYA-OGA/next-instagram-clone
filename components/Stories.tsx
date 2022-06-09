import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { useEffect, useState } from 'react';
import { StoryUser } from '../types';
import Story from './Story';

interface Props {}

const Stories: React.FC<Props> = () => {
  const [storyUsers, setStoryUsers] = useState<StoryUser[]>([]);

  useEffect(() => {
    const users = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: 'en' }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      id: i,
    }));

    setStoryUsers(users);
  }, []);
  return (
    <div className="flex items-center space-x-2 overflow-x-scroll rounded-sm border border-gray-200 bg-white p-6 scrollbar-none">
      {storyUsers.map((user) => (
        <Story key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Stories;
