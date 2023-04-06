import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Kakao from "../../Components/Kakao/Kakao";
import '../../styles/Kakao/Kakao.css';
import Footer from "../../Components/Menu/Footer";
import axios from "axios";

interface MapProps {
	mapdata: any;
}

function Map(props: MapProps) {
	const { mapdata } = props
	return (
		<div id="wrap">
			{/* <Topbar /> */}
			<Kakao mapdata={mapdata}/>
			<Footer />
		</div>
	);
}

export default Map;