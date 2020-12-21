import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { FC } from "react";

export interface TablePaginationProps {
  currentPage: number;
  pageCount: number;
  changePage(page: number): void;
}

export const TablePagination: FC<TablePaginationProps> = ({
  currentPage,
  pageCount,
  changePage,
}) => {
  let items = [];
  for (let i = 0; i < pageCount; i++) {
    items.push(i);
  }

  return (
    <div>
      <Pagination>
        {items.map((item) => {
          const handleClick = () => changePage(item);

          return (
            <Pagination.Item
              onClick={handleClick}
              active={currentPage == item}
              key={item}
            >
              {item + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </div>
  );
};
