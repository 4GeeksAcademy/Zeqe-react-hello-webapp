import React from 'react';
import { createRoot } from 'react-dom/client';
import "../styles/index.css";
import "../styles/demo.css";
import "../styles/home.css";
import Layout from './layout.js';

const root = createRoot(document.getElementById("app")); // Cambiado de querySelector a getElementById
root.render(<Layout />);
