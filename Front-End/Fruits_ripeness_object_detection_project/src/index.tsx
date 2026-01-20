import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DashboardPage from './components/dashboard.tsx';
import SignupPage from './components/signup.tsx';
import LoginForm from './components/Login.tsx';
import Prediction from './components/Prediction.tsx';

import Home from './components/home.tsx';
import Records from './components/records.tsx';
import About from './components/about.tsx';
import ImageUploadAndClassify from './components/imageupload.tsx'
import ManageRecords from './components/admin_panel.tsx'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root to Home */}
        <Route path="/" element={<Navigate to="/Login" />} />
        
        {/* Corrected Home Route */}
        <Route path="/home" element={<Home />} />

        {/* Login and Signup Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/uploading-images" element={<ImageUploadAndClassify />} />
        <Route path="/admin_panel" element={<ManageRecords />} />

        {/* Dashboard and Prediction Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/uploading-images" element={<ImageUploadAndClassify />} />
        <Route path="/admin_panel" element={<ManageRecords />} />
        <Route path="/records" element={<Records />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
