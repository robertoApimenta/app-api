import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Principal from './pages/index/index';
import Editar from './pages/editar/index';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Principal />} />
        <Route exact path='/editar/:_id' element={<Editar />} />
      </Routes>
    </BrowserRouter>
  );
};
