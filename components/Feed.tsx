import React from 'react';
import Posts from './Posts';
import Stories from './Stories';

interface Props {}

const Feed: React.FC<Props> = () => {
  return (
    <main className="grid grid-cols-1 px-3 md:mx-auto md:max-w-6xl md:grid-cols-3">
      <section className="mt-8 md:col-span-2">
        <Stories />
        <Posts />
      </section>

      <section className="hidden md:col-span-1 md:inline-grid">
        {/* mini profile */}
        {/* suggestions */}
      </section>
    </main>
  );
};

export default Feed;
