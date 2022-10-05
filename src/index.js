import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MusicTagging from './pages/MusicTagging';
import Layout from './pages/Layout';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="music-tagging" element={<MusicTagging/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
