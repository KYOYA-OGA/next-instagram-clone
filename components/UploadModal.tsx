import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom';
import Modal from 'react-modal';
import { CameraIcon } from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { async } from '@firebase/util';

interface Props {}

const UploadModal: React.FC<Props> = () => {
  const { data: session } = useSession();
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalState);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  // I have no idea how to handle ArrayBuffer...
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleInputChange = (e: React.FormEvent) => {
    const reader = new FileReader();
    let file = (e.target as HTMLInputElement).files![0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (readerEvent) => {
      const imageData = (readerEvent.target as FileReader).result;
      setSelectedFile(imageData);
    };
  };

  const handleUpload = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      caption: captionRef.current?.value,
      username: session?.user?.username,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, 'data_url')
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      })
      .catch((err) => console.error(err.message))
      .finally(() => {
        setModalIsOpen(false);
        setLoading(false);
        setSelectedFile(null);
      });
  };

  return (
    <div>
      {modalIsOpen ? (
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={() => {
            setModalIsOpen(false);
            setSelectedFile(null);
          }}
          contentLabel="Upload Modal"
          className="absolute left-1/2 top-1/2 mx-auto w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-6 py-10  shadow-md  focus:outline-none focus:ring-1 focus:ring-black lg:w-full"
        >
          <div className="flex h-full flex-col items-center justify-center">
            {selectedFile ? (
              <img
                src={selectedFile}
                alt=""
                className="max-h-64 w-full cursor-pointer object-contain"
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <CameraIcon
                onClick={() => filePickerRef.current?.click()}
                className="h-14 w-14 cursor-pointer rounded-full border-2 bg-red-200 p-2 text-red-500"
              />
            )}
            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={handleInputChange}
            />
            <input
              type="text"
              maxLength={150}
              placeholder="Please enter your caption!"
              className="m-4 w-full border-none text-center hover:outline-none hover:ring-0"
              ref={captionRef}
            />
            <button
              disabled={!selectedFile || loading}
              className="mx-auto w-full bg-red-600 p-2 text-white shadow-md hover:brightness-125 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:brightness-100"
              onClick={handleUpload}
            >
              {loading ? 'Uploading...' : 'Upload Post'}
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default UploadModal;
