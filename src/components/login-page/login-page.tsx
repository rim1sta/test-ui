import React, { FC, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/thunks/login";
import { getIsLoginError } from "../../selectors/selectors";

export const LoginPage: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  
const error = useSelector(getIsLoginError);


  const dispatch = useDispatch();


const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
  if (event.key === 'Enter') {
    dispatch(loginRequest({login, password}));
  }
}


const onLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
  const login = event.target.value;
  setLogin(login);
}

const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
  const password = event.target.value;
  setPassword(password);
  }
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  dispatch(loginRequest({login, password}));
}

  return (
    <>
      <Form onSubmit={handleSubmit} className="container login__container">
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control type="login" placeholder="Enter email" isInvalid={error} onChange={onLoginChange}/>
          <Form.Control.Feedback type="invalid">
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" isInvalid={error} onChange={onPasswordChange}/>
          <Form.Control.Feedback type="invalid">
              Неправильный логин или пароль.
            </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary" className="pull-right">
          Войти
        </Button>
      </Form>
    </>
  );
};
