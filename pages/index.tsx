import type { NextPage } from 'next';
import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import UploadModal from '../components/UploadModal';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* header */}
      <Header />

      {/* feed */}
      <Feed />

      {/* modal */}
      <UploadModal />
    </div>
  );
};

export default Home;
