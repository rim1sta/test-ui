import React, { useState, ChangeEvent, FC } from "react";
import { Link } from "react-router-dom";
import { User } from "../../api/domain/user";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ContactInfoForm } from "../partner-forms/contact-info-form";
import { ContactInfoValidation } from "../../api/domain/contact-info";
import { ContactInfo } from "../../api/domain";
export interface UserProps {
  user: User;
  userToUpdate(user: Partial<User>): void;
  userValidation?: ContactInfoValidation;
}

export const UserFormScreen: FC<UserProps> = ({
  user,
  userToUpdate,
  userValidation,
}) => {
  const [changedUser, setChangedUser] = useState<User>(user);
  
console.log("login", user.login)

  const handleUpdate = () => {
    console.log(changedUser);
    userToUpdate(changedUser);
  };

  const handleContactInfoChange = (contactInfo: ContactInfo) => {
    setChangedUser({ ...changedUser, ...{ contactInfo } });
  };
  return (
    <>
      <Container className="form__container">
        <h2>Информация о пользователе</h2>
        <Form.Group as={Row} controlId="formPlaintextMiddleName">
          <Form.Label column sm="2">
            Имя
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={user.login}
              readOnly
              value={user.login}
              required
            />
          </Col>
        </Form.Group>
        <ContactInfoForm
          validationInfo={userValidation}
          contactInfo={user.contactInfo}
          onContactInfoChange={handleContactInfoChange}
        />

        <div className="pull-right">
          <Link to={"/users"}>
            {" "}
            <Button variant="secondary" className="cancel__button">
              Отмена
            </Button>
          </Link>
          <Button
            variant="primary"
            className="update__button"
            onClick={handleUpdate}
            type="submit"
          >
            Сохранить
          </Button>
        </div>
        <div className="pull-left">
          <Link to={`/user/${user?.id}/password`}>
            <Button className="update__button" variant="outline-secondary">
              Изменить пароль
            </Button>{" "}
          </Link>
        </div>
      </Container>
    </>
  );
};
