import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './style/App.scss';

function App() {
	const [showButton, setShowButton] = useState(false);
	useEffect(() => {
		function handleScroll() {
			window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
		}
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div id='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
			<button
				id='scroll-top-button'
				onClick={() => {
					window.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
				}}
				style={{ display: showButton ? 'block' : 'none' }}>
				<svg viewBox='0 0 24 24' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round'>
					<path stroke='none' d='M0 0h24v24H0z' fill='none' />
					<polyline points='6 15 12 9 18 15' />
				</svg>
			</button>
		</div>
	);
}

export default App;
