import { getClassNames } from "lib/constants/utils/ObjectUtils";
import styles from "./date-range-select.module.css";
const classNames = getClassNames(styles);
export const DateRangeSelect = ({
  onChange = () => {},
  startDate,
  endDate,
  className,
  variant = "default",
}) => {
  const handleOnChange = (e, key) => {
    onChange({ startDate, endDate, [key]: e.target.value });
  };
  return (
    <div className={classNames("wrapper", className, variant)}>
      <div>
        <input
          value={startDate || ""}
          onChange={(e) => handleOnChange(e, "startDate")}
          type="date"
          max={endDate}
        />
      </div>
      <span>~</span>
      <div>
        <input
          value={endDate || ""}
          onChange={(e) => handleOnChange(e, "endDate")}
          type="date"
          min={startDate}
        />
      </div>
    </div>
  );
};
