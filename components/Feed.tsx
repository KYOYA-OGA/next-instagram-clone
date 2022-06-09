import React from 'react';
import Stories from './Stories';

interface Props {}

const Feed: React.FC<Props> = () => {
  return (
    <main>
      <section className="mt-8">
        <Stories />
        {/* Posts */}
      </section>

      <section>
        {/* mini profile */}
        {/* suggestions */}
      </section>
    </main>
  );
};

export default Feed;
