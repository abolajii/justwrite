import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";

const structure = {
  src: {
    components: {
      "ProtectedRoute.js": `
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
`,
    },
    pages: {
      "Login.js": `
import React from 'react';

const Login = () => {
  return <h2>Login Page</h2>;
};

export default Login;
`,
      "Register.js": `
import React from 'react';

const Register = () => {
  return <h2>Register Page</h2>;
};

export default Register;
`,
      "Dashboard.js": `
import React from 'react';

const Dashboard = () => {
  return <h2>Dashboard Page</h2>;
};

export default Dashboard;
`,
      "Profile.js": `
import React from 'react';

const Profile = () => {
  return <h2>Profile Page</h2>;
};

export default Profile;
`,
      "Settings.js": `
import React from 'react';

const Settings = () => {
  return <h2>Settings Page</h2>;
};

export default Settings;
`,
    },
    "App.js": `
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
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
          path="/settings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default App;
`,
    "main.js": `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
  },
};

// Function to create directories and files
async function createStructure(base, struct) {
  for (const key in struct) {
    const newPath = path.join(base, key);
    if (typeof struct[key] === "string") {
      await fsp.writeFile(newPath, struct[key].trim());
    } else {
      if (!fs.existsSync(newPath)) await fsp.mkdir(newPath);
      await createStructure(newPath, struct[key]);
    }
  }
}

// Run the function
createStructure(".", structure).then(() =>
  console.log("File structure created successfully.")
);
