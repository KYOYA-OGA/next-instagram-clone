import { useSession, signOut } from 'next-auth/react';
import React from 'react';

interface Props {}

const MiniProfile: React.FC<Props> = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between">
      <img
        src={
          session?.user?.image
            ? session.user.image
            : 'https://i.pravatar.cc/300'
        }
        alt="user image"
        className="h-16 w-16 rounded-full border p-0.5"
      />
      <div className="ml-4 flex-1">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <p className="text-sm text-gray-600">Hello from dog world!</p>
      </div>
      <button
        onClick={() => signOut()}
        className="text-sm font-semibold text-blue-400"
      >
        Sign out
      </button>
    </div>
  );
};

export default MiniProfile;
