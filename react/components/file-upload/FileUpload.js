import { assets } from "assets";
import React, { forwardRef, useState } from "react";
import styles from "./FileUpload.module.css";
import { useImageModal } from "components/hooks/ModalProvider";
import { isNull } from "lib/constants/utils/ObjectUtils";
import { showErrorToast } from "lib/constants/utils/ToastUtils";
import { message } from "config/Message";

const urlToBlob = async (url) => {
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) {
    return null;
  }
  const blob = await response.blob();
  return blob;
};

const FileUpload = forwardRef((props, ref) => {
  let {
    onChange = () => {},
    text,
    placeholder,
    icon = assets.admin.icons.upload,
    id = "file-upload",
    className,
    accept = "image/*",
    disabled,
    url,
  } = props;

  return (
    <div className={className}>
      {url ? (
        <div className={styles["document-wrapper"]}>
          <DocumentItem
            id={id}
            isChange={!disabled}
            documents={{ text: text, url: url }}
          />
        </div>
      ) : (
        <label className={`${styles["label"]}`} htmlFor={id}>
          <p>{placeholder}</p>
          <img src={icon} alt="" />
        </label>
      )}
      <input
        type={"file"}
        id={id}
        ref={ref}
        accept={accept}
        {...props}
        className={styles["input"]}
      />
    </div>
  );
});

function DocumentItem({ documents, isChange, id }) {
  const { openModal } = useImageModal();
  const [isLoading, setIsLoading] = useState(false);
  let imageBlob;

  const handleDownloadClick = async () => {
    setIsLoading(true);
    imageBlob = await urlToBlob(documents.url);
    setIsLoading(false);
    if (!isNull(imageBlob)) {
      let link = document.createElement("a");
      link.download = `${documents.text}`;

      let reader = new FileReader();
      reader.readAsDataURL(imageBlob);

      reader.onload = function () {
        link.href = reader.result;
        link.click();
      };
    } else {
      let link = document.createElement("a");
      link.target = "_blank";
      link.href = documents.url;
      link.click();
    }
  };

  return (
    <div key={documents.url} className={styles["preview-items"]}>
      <div className={styles["text"]}>
        <img src={assets.admin.icons.imgIcon} alt="" />
        <p>{documents.text}</p>
      </div>
      <img
        onClick={() =>
          openModal({
            image: documents.url,
          })
        }
        src={assets.admin.icons.eyeIcon}
        alt=""
      />
      {isChange ? (
        <label className={styles["label-change"]} htmlFor={id}>
          <img alt="" src={assets.admin.icons.changeImageIcon} />
        </label>
      ) : isLoading ? (
        <div className={styles["download-loader"]}>Downloading...</div>
      ) : (
        <button
          className={styles["download-btn"]}
          onClick={handleDownloadClick}
        >
          <img src={assets.admin.icons.download} alt="download" />
        </button>
      )}
    </div>
  );
}

export default FileUpload;
