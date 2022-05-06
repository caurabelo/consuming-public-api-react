import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApiFetch from './components/ApiFetch';
import ApiAxios from './components/ApiAxios';
import Layout from './components/routes/Layout';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<ApiFetch />} />
            <Route path="apiAxios" element={<ApiAxios />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Rota não mapeada!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
