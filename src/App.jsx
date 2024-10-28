import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import React, { useState } from "react";

import Bookmark from "./pages/Bookmark";
import Conversation from "./pages/Conversation";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import { ToastProvider } from "./context/ToastContext";
import useAuthStore from "./store/useAuthStore";

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversation"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Conversation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmark"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Bookmark />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;
