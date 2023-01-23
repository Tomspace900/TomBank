import '../style/components/Header.scss';

import React, { useRef } from 'react';

const Header = () => {
	const fileInputRef = useRef(null);

	return (
		<div id='header'>
			<h1 id='title'>🏦 TomBank</h1>
			<div id='header-right'>
				<button
					id='file-button'
					onClick={() => {
						fileInputRef.current.click();
					}}>
					<svg viewBox='0 0 24 24' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
						<path stroke='none' d='M0 0h24v24H0z' fill='none' />
						<path d='M14 3v4a1 1 0 0 0 1 1h4' />
						<path d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' />
						<line x1='12' y1='11' x2='12' y2='17' />
						<polyline points='9 14 12 11 15 14' />
					</svg>
					<span>Add file</span>
				</button>
				<input type='file' id='file-input' accept='.csv' ref={fileInputRef} />
				<button id='save-button'>
					<svg viewBox='0 0 24 24' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
						<path stroke='none' d='M0 0h24v24H0z' fill='none' />
						<path d='M14 3v4a1 1 0 0 0 1 1h4' />
						<path d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' />
						<line x1='12' y1='11' x2='12' y2='17' />
						<polyline points='9 14 12 17 15 14' />
					</svg>
					<span>Save file</span>
				</button>
			</div>
		</div>
	);
};

export default Header;
