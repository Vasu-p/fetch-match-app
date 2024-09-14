import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  return (
    <div>
      Login Page
      <Button onClick={() => navigate("/home")}>Go to Home</Button>
    </div>
  );
}
