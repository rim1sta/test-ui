import React, { useState, ChangeEvent } from "react";
import { FC } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { passwordToEdit } from "../../store/thunks/user";
import { useDispatch } from "react-redux";

export const PasswordEdit: FC<{ id?: string }> = ({ id }) => {
  const [editedPassword, setEditedPassword] = useState("");
  const [dublicateEditedPassword, setDublicateEditedPassword] = useState("");
  const dispatch = useDispatch();

  const doPasswordsMatch = () => {
    if (editedPassword === dublicateEditedPassword) {
      return true;
    } else {
      return false;
    }
  };

  const onSecondPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setDublicateEditedPassword(password);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setEditedPassword(password);
  };

  const handleUpdate = () => {
    if (doPasswordsMatch()) {
      dispatch(passwordToEdit(editedPassword, id));
    };
  };

  return (
    <>
      <Container className="form__container">
        <h2>Редактирование пароля</h2>
        <Form>
          <Form.Group>
            <Form.Label htmlFor="inputPassword6">
              Введите новый пароль
            </Form.Label>
            <Form.Control
              type="password"
              className="mx-sm-3 t_password"
              id="inputPassword1"
              aria-describedby="passwordHelpInline"
              value={editedPassword}
              onChange={onPasswordChange}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Пароль должен содержать от 8 до 20 символов.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="inputPassword6">Повторите пароль</Form.Label>
            <Form.Control
              type="password"
              className="mx-sm-3 t_password-repeat"
              id="inputPassword2"
              aria-describedby="passwordHelpInline"
              value={dublicateEditedPassword}
              onChange={onSecondPasswordChange}
              isInvalid={!doPasswordsMatch()}
            />
            <Form.Control.Feedback type="invalid">
              Пароли не совпадают
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <div className="pull-right">
          <Link to={`/user/${id}`}>
            {" "}
            <Button variant="secondary" className="cancel__button">
              Отмена
            </Button>
          </Link>
          <Button
            variant="primary"
            className="update__button"
            type="submit"
            onClick={handleUpdate}
          >
            Подтвердить
          </Button>
        </div>
      </Container>
    </>
  );
};
