import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IntroPage from './Pages/Intro/IntroPage';
import TypeFilter from './Pages/typeFilter/TypesFilter';
import ResourceList from './Pages/ResourceList/ResourceList';
import './App.css';

function RouterListener() {
	const navigate = useNavigate();

	useEffect(() => {
	  // If no filter is set and we're not on the homepage, redirect to "/"
	  const timeFilter = localStorage.getItem("timeFilter");
	  const typeFilter = localStorage.getItem("typeFilter");
	  if (!timeFilter && !typeFilter && window.location.pathname !== "/") {
		navigate("/", { replace: true });
	  }
	}, [navigate]);
  
	return null;
  }
function App() {

	return (
		<Router>
			<RouterListener />
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
