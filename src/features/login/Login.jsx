import React, { useCallback, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import fetchLogo from "src/assets/fetch.png";
import { login } from "src/features/login/api";

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const hanldeLoginClick = useCallback(() => {
    login(name, email).then(() => {
      onLogin({ name, email });
      navigate("/home");
    });
  }, [name, email]);

  return (
    <Container className="col-md-4 h-100">
      <Stack
        gap={4}
        className="h-100 justify-content-center align-items-center"
      >
        <img src={fetchLogo} height={200} width={200} />
        <Form.Control
          type="input"
          placeholder="Name"
          value={name}
          onInput={(e) => {
            setName(e.target.value);
          }}
        />
        <Form.Control
          type="input"
          placeholder="Email"
          value={email}
          onInput={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button onClick={hanldeLoginClick}>Login</Button>
      </Stack>
    </Container>
  );
}
