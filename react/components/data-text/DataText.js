import { isEmptyString } from "lib/constants/utils/ObjectUtils";
import styles from "./DataText.module.css";
import { TextCopy } from "components/admin/common/text-copy";

export default function DataText({
  header,
  value,
  children,
  isEditable,
  setValue,
}) {
  return (
    <div className={styles["type-wrapper"]}>
      <h2>{header}</h2>
      {children ? (
        children
      ) : (
        <div className={styles["type"]}>
          {isEditable ? (
            <input
              type="text"
              className={styles["edit-input"]}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></input>
          ) : isEmptyString(value) ? (
            <p>Not provided</p>
          ) : (
            <TextCopy text={value} />
          )}
        </div>
      )}
    </div>
  );
}
