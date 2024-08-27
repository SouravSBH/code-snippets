import ModalType from "lib/constants/enum/ModalType";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const ModalContext = createContext({});
export default function ModalProvider({ children }) {
  const [modalData, setModalData] = useState({
    show: false,
    type: null,
    data: null,
  });
  return (
    <ModalContext.Provider
      value={{
        modalData,
        setModalData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);

export const useConfirmModal = () => {
  const { modalData, setModalData } = useContext(ModalContext);

  const closeModal = () => {
    setModalData((state) => {
      return {
        ...state,
        show: false,
        type: null,
      };
    });
  };

  const openModal = (data) => {
    setModalData((state) => {
      return {
        ...state,
        show: true,
        data: data,
        type: ModalType.ADMIN_CONFIRM,
      };
    });
  };

  return {
    modalData,
    setModalData,
    closeModal,
    openModal,
    confirmModalData: modalData.data,
  };
};

export const useImageModal = () => {
  const { modalData, setModalData } = useContext(ModalContext);

  const closeModal = () => {
    setModalData((state) => {
      return {
        ...state,
        show: false,
        type: null,
      };
    });
  };

  const openModal = (data) => {
    setModalData((state) => {
      return {
        ...state,
        show: true,
        data: data,
        type: ModalType.ADMIN_IMAGE,
      };
    });
  };

  return {
    modalData,
    setModalData,
    closeModal,
    openModal,
    imageData: modalData.data,
  };
};

export const useRewardPoinModal = () => {
  const { modalData, setModalData } = useContext(ModalContext);

  const closeModal = () => {
    setModalData((state) => {
      return {
        ...state,
        show: false,
        type: null,
      };
    });
  };

  const openModal = (data) => {
    setModalData((state) => {
      return {
        ...state,
        show: true,
        data: data,
        type: ModalType.REWARD_POINT_ADD,
      };
    });
  };

  return {
    modalData,
    setModalData,
    closeModal,
    openModal,
    addRewardPointData: modalData.data,
  };
};

export const useCommonModal = (children) => {
  const { modalData, setModalData } = useContext(ModalContext);

  useEffect(() => {
    if (children) {
      setChildren(children);
    }
    return () => {};
  }, []);

  const setChildren = (children) => {
    setModalData((state) => {
      return {
        ...state,
        children: children,
      };
    });
  };

  const closeModal = () => {
    setModalData((state) => {
      return {
        ...state,
        show: false,
        type: null,
      };
    });
  };
  const openModal = (data) => {
    setModalData((state) => {
      return {
        ...state,
        show: true,
        data: data,
        children: data.children ?? state.children,
        type: ModalType.COMMON,
      };
    });
  };

  return {
    modalData,
    setModalData,
    setChildren,
    closeModal,
    openModal,
  };
};
