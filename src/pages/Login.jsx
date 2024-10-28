import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import React, { useState } from "react";

import { FiLogIn } from "react-icons/fi";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";
import { useToast } from "../context/ToastContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuthStore();
  const { addToast } = useToast(); // Access addToast function

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email or password is empty and show a toast if so
    if (!email) {
      addToast("Email is required", "error");
      return;
    }

    if (!password) {
      addToast("Password is required", "error");
      return;
    }

    // Attempt login and handle success/failure
    await login(email, password);
    if (!error) {
      addToast("Logging in successful!", "success");
      setTimeout(() => navigate("/dashboard"), 3000); // 3-second delay
    } else {
      addToast(error, "error");
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Title>
          <FiLogIn size={24} />
          Login
        </Title>

        <InputContainer>
          <AiOutlineMail size={20} />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <AiOutlineLock size={20} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </Container>
  );
};

export default Login;

// Style components remain the same...
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  &:focus-within {
    outline: 2px solid rgba(74, 144, 226, 0.5); /* Add a blue outline when child input is focused */
    border-radius: 8px; /* Ensure the outline matches the rounded look */
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #4a90e2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
