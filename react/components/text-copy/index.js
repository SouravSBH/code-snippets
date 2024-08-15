import { getClassNames } from "lib/constants/utils/ObjectUtils";
import style from "./text-copy.module.css";
import { assets } from "assets";
import { useEffect, useRef } from "react";
import { copyToClipboard } from "lib/constants/utils/CommonUtils";
import { showToast } from "lib/constants/utils/ToastUtils";
const classNames = getClassNames(style);
export const TextCopy = ({ text = "", copyText }) => {
  const copyTextRef = useRef(copyText);
  useEffect(() => {
    copyTextRef.current = copyText ?? text;
  }, [copyText, text]);
  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    copyToClipboard(copyTextRef.current, () => {
      showToast("Copied to clipboard");
    });
  };
  return (
    <div className={classNames("wrapper")}>
      <span className={classNames("text")}>
        {text}
        <span className={classNames("copy")}>
          <button onClick={handleCopy}>
            <img src={assets.admin.copyUrlIcon} alt="" height={18} width={18} />
          </button>
        </span>
      </span>
    </div>
  );
};
