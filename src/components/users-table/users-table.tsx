import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPageData,
  getUserCurrentPage,
  getUserSearchValue,
  getUserToDelete,
} from "../../selectors/selectors";
import Container from "react-bootstrap/Container";
import { Table, Row, Col, Button } from "react-bootstrap";
import { ModalWindow } from "../modals/modal-window";
import { SearchInput } from "../search-input/search-input";
import { Link } from "react-router-dom";
import { updateUserPage } from "../../store/thunks/user";
import { TablePagination } from "../pagination/pagination";
import {
  updateCurrentPage,
  userToDelete,
  updateSearchValue,
} from "../../store/thunks/user";
import { ApiServiceImpl } from "../../api/api-service";
import { UsersShortInfo } from "../../api/domain/users-short-info";

const FA = require("react-fontawesome");

export const UsersTable: FC = () => {
  const dispatch = useDispatch();

  const pageIndex = useSelector(getUserCurrentPage);
  const searchValue = useSelector(getUserSearchValue);
  const pageData = useSelector(getUserPageData);
  const userToRemove = useSelector(getUserToDelete);

  const isOpened = !!userToRemove;
  const deleteQuestion = `Вы точно уверены, что хотите удалить данные о пользователе: ${userToRemove?.login}?`;

  useEffect(() => {
    dispatch(updateUserPage(pageIndex, searchValue));
  }, [dispatch, pageIndex, searchValue]);

  const updateSearchValueFn = (search: string) => {
    console.log("search", search);
    dispatch(updateSearchValue(search));
  };

  // HANDLERS

  const handlePageChange = (pageIndex: number) => {
    dispatch(updateCurrentPage(pageIndex, pageData?.pagesCount || 0));
  };

  const handleOnOpen = (user: UsersShortInfo) => {
    dispatch(userToDelete(user));
  };

  const handleOnClose = (answer: boolean) => {
    if (!answer) {
      dispatch(userToDelete(null));
      return;
    } else {
      ApiServiceImpl.instance.deleteUser(userToRemove!.id).then((res) => {
        dispatch(userToDelete(null));
        if (res) {
          dispatch(updateUserPage(pageIndex, searchValue));
        }
      });
    }
  };

  return (
    <>
      <Container fluid className="mt-3">
        <SearchInput search={searchValue} searchChange={updateSearchValueFn} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Имя пользователья</th>
              <th>Электронный адрес</th>
              <th>Номер телефона</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pageData?.items.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.login}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Link to={`/user/${item.id}`}>
                      <button className="folder__button">
                        <FA name=" fa-folder-open-o" className="folder__icon" />
                      </button>
                    </Link>
                    <button
                      className="trash__button"
                      onClick={() => handleOnOpen(item)}
                    >
                      <FA name="fa fa-trash-o" className="trash__icon" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Row>
          <Col>
            <Link to="/user-create/">
              <Button variant="primary">Создать пользователья</Button>
            </Link>
            <div className="pull-right">
              <TablePagination
                currentPage={pageIndex}
                pageCount={pageData?.pagesCount || 0}
                changePage={handlePageChange}
              ></TablePagination>
            </div>
          </Col>
        </Row>
      </Container>
      {isOpened && (
        <ModalWindow
          text={deleteQuestion}
          onClose={handleOnClose}
        ></ModalWindow>
      )}
    </>
  );
};
