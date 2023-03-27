import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import Navbar from '../Menu/Navbar'
import TopbarStyle from '../../styles/Topbar/Topbar.module.css'

const Topbar = () => {
	return (
		<div className={TopbarStyle.Topbarcontainer}>
			{/* <SearchBar /> */}
			<Navbar />
		</div>
	);
};

export default Topbar;
