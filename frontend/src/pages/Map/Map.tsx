import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Kakao from "../../Components/Kakao/Kakao";
import '../../styles/Kakao/Kakao.css';
import Footer from "../../Components/Menu/Footer";

function Map() {
	return (
		<div id='wrap'>
			{/* <Topbar /> */}
			<Kakao />
			<Footer />
		</div>
	);
}

export default Map;