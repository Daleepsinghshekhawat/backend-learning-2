import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Form from "./Form";
import Users from "./Users";
import UsersInfo from "./UsersInfo";
import UpdateUsers from "./UpdateUsers";
import DeletedUsers from "./DeletedUsers";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from './Forgotpassword';
import ResetPassword from './ResetPassword';
import './App.css'

const  App=()=> {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usersinfo/:id"
          element={
            <ProtectedRoute>
              <UsersInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateusers/:id"
          element={
            <ProtectedRoute>
              <UpdateUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deletedusers/:id"
          element={
            <ProtectedRoute>
              <DeletedUsers />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
