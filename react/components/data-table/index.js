import { getClassNames } from "lib/constants/utils/ObjectUtils";
import styles from "./data-table.module.css";
import { Paginator } from "../paginator";
const classNames = getClassNames(styles);
export const DataTable = ({
  columns,
  onRowClick,
  rows,
  cell = () => {},
  placeHolder = "---",
  empty,
  showPaginator = false,
  onPageChange = () => {},
  totalPages = 1,
  currentPage = 1,
}) => {
  if (!rows?.length) {
    return <div className={classNames("empty")}>{empty}</div>;
  }
  return (
    <>
      <div className={classNames("table-wrapper")}>
        <table className={classNames("table")}>
          <thead>
            <tr className={classNames("header-row")}>
              {columns.map((item, index) => (
                <th key={index}>{item.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={classNames("data-row", onRowClick && "row-click")}
                onClick={(e) => {
                  if (onRowClick) {
                    const selection = document.getSelection();
                    if (selection && selection.type == "Range") {
                      e.stopPropagation();
                      return;
                    }
                    onRowClick(row, rowIndex);
                  }
                }}
              >
                {columns.map((column, columnIndex) => {
                  const className =
                    typeof column.className == "function"
                      ? column.className(row[column.key], row)
                      : column.className;

                  return (
                    <td
                      key={columnIndex}
                      className={classNames(className || "")}
                    >
                      {cell({
                        data: row[column.key],
                        column,
                        row,
                        rowIndex,
                        columnIndex,
                      }) ||
                        (column.render &&
                          column.render(row[column.key], row)) ||
                        row[column.key]?.toString() ||
                        placeHolder}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPaginator && (
        <Paginator
          onPageChange={onPageChange}
          key={totalPages}
          totalPages={totalPages}
          currentPage={currentPage}
          className={classNames("paginator")}
        />
      )}
    </>
  );
};
