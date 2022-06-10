import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom';

interface Props {}

const UploadModal: React.FC<Props> = () => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalState);
  return <div>UploadModal {modalIsOpen && <p>OPEN!!</p>}</div>;
};

export default UploadModal;
