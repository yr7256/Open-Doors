import React from 'react';
import basicimg from '../../assets/img/basicimg.png';
import { Image } from '../../styles/Profile/MyImgstyle';

function MyImg() {
	return (
		<>
			<Image src={basicimg} alt="My Image"></Image>
		</>
	);
}

export default MyImg;
