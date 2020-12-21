import { FC, useEffect } from "react";
import React from "react";
import { ApiServiceImpl } from "../../api/api-service";
import { Table } from "react-bootstrap";
import { PartnerShortInfo, PartnerType } from "../../api/domain";
import Container from "react-bootstrap/Container";
import { TablePagination } from "../pagination/pagination";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ModalWindow } from "../modals/modal-window";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Button from "react-bootstrap/Button";
import { partnerToDelete, updatePage } from "../../store/thunks/partner";
import { getCurrentPage, getPageData, getPartnerToRemove } from "../../selectors/selectors";
const FA = require("react-fontawesome");

export const PartnersTable: FC = () => {
  const dispatch = useDispatch();


  const pageIndex = useSelector(getCurrentPage);
  const pageData = useSelector(getPageData);
  const partnerToRemove = useSelector(getPartnerToRemove);
 
  const isOpened = !!partnerToRemove;
  const deleteQuestion = `Вы точно хотите удалить данные о ${partnerToRemove?.displayName}?`;

  const handleOnOpen = (partner: PartnerShortInfo) => {
    dispatch(partnerToDelete(partner));
  };

  const handleOnClose = (answer: boolean) => {
    if (!answer) {
      dispatch(partnerToDelete(null))
      return;
    } else {
      ApiServiceImpl.instance.deletePartner(partnerToRemove!.id).then((res) => {
        dispatch(partnerToDelete(null))
        if (res) {
          dispatch(updatePage(pageIndex))
        }
      });
    }
  };

  useEffect(() => {
   dispatch(updatePage(pageIndex))
      }
    , [dispatch, pageIndex]);

  const handlePageChange = (pageIndex: number) => {
    dispatch(updatePage(pageIndex))
  };

  return (
    <>
      <Container fluid className="mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Имя партнера</th>
              <th>Тип партнера</th>
              <th>Город</th>
              <th>Адрес</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pageData?.items.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.displayName}</td>
                  <td>
                    {item.partnerType === PartnerType.legalEntity
                      ? "Юридическое лицо"
                      : "Физическое лицо"}
                  </td>
                  <td>{item.city}</td>
                  <td>{item.address}</td>
                  <td>
                    <Link to={`/partner/${item.id}`}>
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
          <Link to='/partner-create/'>
            <Button variant="primary">Добавить партнера</Button>
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
