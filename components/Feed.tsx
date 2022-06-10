import { useSession } from 'next-auth/react';
import React from 'react';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';

const Feed: React.FC = () => {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 px-3 md:mx-auto ${
        session ? 'md:max-w-6xl md:grid-cols-3' : 'md:max-w-3xl md:grid-cols-2'
      } `}
    >
      <section className="mt-8 md:col-span-2">
        <Stories />
        <Posts />
      </section>

      {session ? (
        <section className="ml-10 mr-4 mt-14 hidden md:col-span-1 md:inline-grid">
          <div className="fixed w-96">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default Feed;
