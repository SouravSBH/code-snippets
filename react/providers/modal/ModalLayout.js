import React from "react";
import AuthModal from "components/modal/auth-modal/AuthModal";
import { useQueryState } from "lib/hooks/useQueryState";
import { isNull } from "lib/constants/utils/ObjectUtils";
import { useModal } from "components/hooks/ModalProvider";
import ModalType from "lib/constants/enum/ModalType";
import ConfirmModal from "components/admin/common/modals/confirm-modal/ConfirmModal";
import ImageModal from "components/admin/common/modals/image-modal/ImageModal";
import AddRewardPointModal from "components/admin/common/modals/add-reward-points-modal/AddRewardPointModal";
import CommonModal from "components/admin/common/modals/common-modal/CommonModal";

export default function ModalLayout() {
  const [query] = useQueryState();
  const { modalData } = useModal();
  const modalComponent = {
    [ModalType.COMMON]: <CommonModal />,
    [ModalType.ADMIN_CONFIRM]: <ConfirmModal />,
    [ModalType.ADMIN_IMAGE]: <ImageModal />,
    [ModalType.REWARD_POINT_ADD]: <AddRewardPointModal />,
  };
  return (
    <>
      {!isNull(query.authState) && <AuthModal />}
      {modalData.show && modalComponent[modalData.type]}
    </>
  );
}
