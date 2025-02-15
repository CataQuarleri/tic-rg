import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IntroPage from './components/Intro/IntroPage';
import TypeFilter from './components/typeFilter/TypesFilter';
import ResourceList from './components/ResourceList/ResourceList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/type" element={<TypeFilter />} />
          <Route path="/resources" element={<ResourceList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;