import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layouts/mainLayout";

import Circles from "./pages/Circle";
import Messages from "./pages/Messages";

import Friends from "./pages/Friends";

import FriendRequests from "./pages/FriendRequest";

import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/circles"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Circles />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Messages />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Friends />
              </MainLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
