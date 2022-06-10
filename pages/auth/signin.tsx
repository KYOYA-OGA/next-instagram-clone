import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import Header from '../../components/Header';

export default function Signin({ providers }: any) {
  return (
    <>
      <Header />
      <main className="mt-20 flex items-center justify-center space-x-7">
        <Image
          src="/instagram-signin.png"
          alt="smartphone with instagram"
          width={192}
          height={320}
          objectFit="contain"
          className="hidden rotate-6 md:inline-flex"
        />
        <div className="flex justify-center">
          {Object.values(providers).map((provider: any) => {
            return (
              <div
                className="flex flex-col items-center space-y-5 lg:space-y-10"
                key={provider.id}
              >
                <Image
                  src="/instagram-logo.webp"
                  alt="instagram"
                  width={80}
                  height={80}
                />
                <p className="italic">
                  This app is created for learning purposes🙇‍♂️
                </p>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className="rounded-lg bg-red-500 p-3 text-white hover:bg-red-600"
                >
                  Sing in with {provider.name}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
