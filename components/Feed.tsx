import React from 'react';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';

interface Props {}

const Feed: React.FC<Props> = () => {
  return (
    <main className="grid grid-cols-1 px-3 md:mx-auto md:max-w-6xl md:grid-cols-3">
      <section className="mt-8 md:col-span-2">
        <Stories />
        <Posts />
      </section>

      <section className="ml-10 mr-4 mt-14 hidden md:col-span-1 md:inline-grid">
        <div className="fixed w-96">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
