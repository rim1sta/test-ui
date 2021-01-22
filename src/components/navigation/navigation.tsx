import React from "react";
import Nav from "react-bootstrap/Nav";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { logout } from "../../store/thunks/login";



export const Navigation = () => {
    const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
  }
  
    return (
      <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/partners">Партнеры</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/users" eventKey="link-1">
              Пользователи
            </Nav.Link>
          </Nav.Item>
          
        
          <Button onClick={handleLogout}
          className="exit__button">Выйти</Button>
          
  
        </Nav>
    )
  }