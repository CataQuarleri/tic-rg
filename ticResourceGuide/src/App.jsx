import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IntroPage from './Pages/Intro/IntroPage';
import TypeFilter from './Pages/typeFilter/TypesFilter';
import ResourceList from './Pages/ResourceList/ResourceList';
import './App.css';

function App() {

	return (
		<Router>
			<Layout>
				<Routes>
					<Route
						path='/'
						element={<IntroPage />}
					/>
					<Route
						path='/type'
						element={<TypeFilter />}
					/>
					<Route
						path='/resources'
						element={<ResourceList />}
					/>
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
