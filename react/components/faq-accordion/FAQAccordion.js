import { useState } from "react";
import styles from "components/faq/faq-accordion/FAQAccordion.module.css";
import { assets } from "assets";
import HorizontalLine from "components/common/horizontal-line/HorizontalLine";
import { translator } from "lib/localization";
import { useRef } from "react";
import { MINIMUM_FAQ_LIST_LIMIT } from "lib/constants/utils/CommonConstantList";
import { MINUS_ICON, PLUS_ICON } from "lib/svg/icons";
import { useIsMobile } from "lib/hooks/useLayoutWidth";
import { landingPageColor } from "lib/constants/utils/ColorUtils";
export default function FAQAccordion({ title, data, parentIndex }) {
  const [selected, setSelected] = useState(parentIndex == 0 ? 0 : -1);
  const [hoverItemIndex, setHoverItemIndex] = useState(null);
  const ref = useRef();
  const [showAll, setShowAll] = useState(false);
  const { isMobile } = useIsMobile();

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const handlePlusIconColor = (mouseEnter, index) => {
    mouseEnter ? setHoverItemIndex(index) : setHoverItemIndex(null);
  };

  const plusButtonSize = isMobile ? "16" : "20";
  const objectKeys = Object.keys(data);
  return (
    <div className={`${styles["accordion"]} `}>
      <div className={styles["accordion-title"]} ref={ref}>
        {title}
      </div>
      {objectKeys
        .slice(
          0,
          showAll
            ? objectKeys.length
            : Math.min(MINIMUM_FAQ_LIST_LIMIT, objectKeys.length)
        )
        .map((faq, i) => (
          <div>
            {i !== 0 && (
              <div>
                <HorizontalLine bgColor="#0000004d" />
              </div>
            )}

            <div
              onClick={() => toggle(i)}
              className={`${styles["accordion-item-header"]} ${
                selected === i ? styles["show"] : ""
              }`}
              onMouseEnter={() => handlePlusIconColor(true, i)}
              onMouseLeave={() => handlePlusIconColor(false, i)}
              onTouchStart={() => handlePlusIconColor(true, i)}
              onTouchEnd={() => handlePlusIconColor(false, i)}
            >
              <h4
                className={`${styles["accordion-item-header-title"]} ${
                  selected === i ? styles["show"] : ""
                }`}
              >
                {faq}
                <br />
              </h4>
              <div>
                {selected === i ? (
                  <MINUS_ICON size={plusButtonSize} />
                ) : (
                  <PLUS_ICON
                    color={
                      hoverItemIndex == i
                        ? landingPageColor.BRAND_COLOR
                        : "#000"
                    }
                    size={plusButtonSize}
                  />
                )}
              </div>
            </div>
            <div
              className={
                selected === i
                  ? `${styles["accordion-item-content"]} ${styles["show"]}`
                  : styles["accordion-item-content"]
              }
            >
              <div className={styles["accordion-item-content-description"]}>
                <div
                  className={styles["accordion-item-content-description-list"]}
                >
                  <p>{data[faq]}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div
        className={`${styles["view-all-wrapper"]}`}
        style={{ minHeight: showAll ? "80px" : "130px" }}
      >
        <button
          className={styles["view-all-button"]}
          onClick={() => {
            if (showAll) {
              ref.current.scrollIntoView({ behavior: "smooth" });
            }
            setShowAll(!showAll);
          }}
        >
          {!showAll
            ? translator("COMMON.MORE_CAPITAL")
            : translator("COMMON.LESS_CAPITAL")}
        </button>
      </div>
    </div>
  );
}
