import React from 'react';
import { createRoot } from 'react-dom/client';
import Quiz from './components/Quiz/Quiz'
import './css/index.scss'
import './css/scrolbar.scss'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>
);