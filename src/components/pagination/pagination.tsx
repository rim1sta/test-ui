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
  const handleFirstPageClick = () => changePage(0);
  const handleLastPageClick = () => changePage(pageCount - 1);
  const handlePrevPageClick = () => changePage(currentPage - 1);
  const handleNextPageClick = () => changePage(currentPage + 1);

  return (
    <div>
      <Pagination>
        <Pagination.First onClick={handleFirstPageClick} />
        <Pagination.Prev onClick={handlePrevPageClick} />
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
          )
        })}
        <Pagination.Next onClick={handleNextPageClick} />
        <Pagination.Last onClick={handleLastPageClick} />
      </Pagination>
    </div>
  );
};
