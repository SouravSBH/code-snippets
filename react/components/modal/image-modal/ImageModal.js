import { assets } from "assets";
import styles from "./ImageModal.module.css";
import { useImageModal } from "components/hooks/ModalProvider";
import { downloadFile } from "lib/constants/utils/FileUtils";
export default function ImageModal() {
  const { closeModal, imageData } = useImageModal();
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div>
        <div className={styles["body"]}>
          {imageData?.showButtons && (
            <div className={styles["buttons"]}>
              <button
                className={styles["download-button"]}
                onClick={(e) => {
                  stopPropagation(e);
                  downloadFile({ url: imageData?.image, text: imageData.text });
                }}
              >
                <img src={assets.koritkarma.icons.downloadIconWhite} />
              </button>

              <button onClick={closeModal} className={styles["close-button"]}>
                <img src={assets.koritkarma.icons.closeIconWhite} />
              </button>
            </div>
          )}
          <img
            onClick={stopPropagation}
            className={styles["image"]}
            src={imageData?.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
