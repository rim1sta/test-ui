import React, { useState, ChangeEvent, FC, useCallback } from "react";
import { ContactInfoForm } from "../partner-forms/contact-info-form";
import { User } from "../../api/domain/user";
import { CompanyInfoValidation } from "../../api/domain/company-info";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../store/thunks/user";
import { getLoginValid } from "../../selectors/selectors";
import { ContactInfo } from "../../api/domain/contact-info";

export interface UserProps {
  user?: User;
  userCreate(user: Partial<User>): void;
  userValidation?: CompanyInfoValidation;
  loginValue?: string;
  loginChange(value: string): void;
}

export const CreateUserForm: FC<UserProps> = ({
  user,
  loginValue,
  loginChange,
}) => {
  const [login, setLoginValue] = useState(loginValue);
  const [editedPassword, setEditedPassword] = useState("");
  const [dublicateEditedPassword, setDublicateEditedPassword] = useState("");
  const [changedUser, setChangedUser] = useState<Partial<User>>();

  const dispatch = useDispatch();
  const loginValid = useSelector(getLoginValid);

  const loginChangeDebounced = useCallback(debounce(loginChange, 400), []);

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const login = event.target.value;
    setLoginValue(login);
 if(!!login){ 
    loginChangeDebounced(login);}
    setChangedUser({ ...changedUser, ...{ login } });
  };

  const isPasswordsMatch = () => {
    if (editedPassword === dublicateEditedPassword) {
      return true;
    } else {
      return false;
    }
  };

  const onSecondPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setDublicateEditedPassword(password);
    setChangedUser({ ...changedUser, ...{ password } });
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setEditedPassword(password);
  };

  const handleContactInfoChange = (contactInfo: ContactInfo) => {
    setChangedUser({ ...changedUser, ...{ contactInfo } });
  };

  const handleCreate = () => {
      console.log( login)
      dispatch(createNewUser(changedUser));
  }
  return (
    <>
      <Container className="form__container">
        <h2>Имя пользователя</h2>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextMiddleName">
            <Form.Label column sm={2}>
              Логин
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="введите ваш логин"
                value={user?.login}
                onChange={handleLoginChange}
                isInvalid={loginValid}
                required
              />
              <Form.Control.Feedback type="invalid">
                Данное имя пользователя уже занято.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Form>
        <h2>Пароль</h2>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2} htmlFor="inputPassword6">
              Придумайте пароль
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                id="inputPassword1"
                aria-describedby="passwordHelpInline"
                value={editedPassword}
                onChange={onPasswordChange}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Пароль должен содержать от 8 до 20 символов.
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2} htmlFor="inputPassword6">
              Повторите пароль
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                id="inputPassword2"
                aria-describedby="passwordHelpInline"
                value={dublicateEditedPassword}
                onChange={onSecondPasswordChange}
                isInvalid={!isPasswordsMatch()}
              />
              <Form.Control.Feedback type="invalid">
                Пароли не совпадают
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Form>
        <ContactInfoForm onContactInfoChange={handleContactInfoChange} />
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
            onClick={handleCreate}
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </Container>
    </>
  );
};
