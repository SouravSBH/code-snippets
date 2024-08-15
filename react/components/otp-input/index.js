import { KeyCode } from "lib/constants/enum/KeyCode";
import { getClassNames } from "lib/constants/utils/ObjectUtils";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./style.module.css";
const classNames = getClassNames(styles);

export const OtpInput = ({ length, onChange = () => null, placeholder }) => {
  const inputArray = useMemo(() => Array.from({ length }, (_, i) => i), []);
  const inputRefs = inputArray.map(() => useRef());
  const [value, setValue] = useState([]);
  const handlePaste = async (event) => {
    event?.preventDefault();
    let paste = await navigator.clipboard.readText();
    if (paste.length !== length || Number(paste) === NaN) {
      return;
    }
    setValue(paste.split(""));
  };

  useEffect(() => {
    onChange(value.filter((item) => !!item).join(""));
  }, [value]);

  const isCtrlPressed = useRef(false);

  const handleKeyDown = (event, index) => {
    event.preventDefault();
    const { code, keyCode } = event;
    switch (true) {
      case keyCode == KeyCode.cmd || keyCode == KeyCode.ctrl:
        isCtrlPressed.current = true;
        break;

      case code.startsWith("Digit"):
        const digit = code[5];
        value[index] = digit;
        setValue([...value]);
        break;

      case keyCode == KeyCode.backSpace || keyCode == KeyCode.delete:
        if (index > 0 && !value[index]) {
          const prevInput = inputRefs[index - 1];
          prevInput?.current.focus();
        }
        value[index] = "";
        setValue([...value]);
        break;

      case isCtrlPressed.current && keyCode == KeyCode.v:
        handlePaste(event);
        break;

      default:
        isCtrlPressed.current = false;
    }
  };

  const handleKeyUp = (event, index) => {
    event.preventDefault();
    const { code } = event;
    if (code.startsWith("Digit")) {
      const nextInput = inputRefs[index + 1];
      nextInput?.current.focus();
    }
    isCtrlPressed.current = false;
  };

  return (
    <div className={classNames("input-group")}>
      {inputArray.map((_, index) => (
        <input
          ref={inputRefs[index]}
          key={index}
          placeholder={placeholder}
          value={value[index]}
          onPaste={handlePaste}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onKeyUp={(event) => handleKeyUp(event, index)}
          className={classNames("input")}
        />
      ))}
    </div>
  );
};
