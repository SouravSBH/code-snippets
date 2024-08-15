import styles from "./CommonModal.module.css";
import { useCommonModal } from "components/hooks/ModalProvider";
export default function CommonModal({}) {
  const { closeModal, modalData } = useCommonModal();
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div onClick={stopPropagation}>
        <div className={styles["body"]}>{modalData.children}</div>
      </div>
    </div>
  );
}
