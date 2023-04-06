import React, { useState } from 'react';
import axios from 'axios';
import basicimg from '../../assets/img/basicimg.png';
import { Image, ProfileImage, ButtonBackground, ButtonImage } from '../../styles/Profile/MyImgstyle';

function MyImg() {
	const [myImage, setMyImage] = useState(`${basicimg}`);

	// 백엔드 미구현
	const getImage = axios.get('').then((res) => {
		// console.log(getImage);
		// // res 형태에 따라 뒤에 null 값이 달라질 수 있음
		// if (res === null) {
		// 	setMyImage(basicimg);
		// } else {
		// 	// res 형태에 따라 뒤에 값이 달라질 수 있음
		// 	setMyImage(res.data.image);
		// }
	});

	return (
		<>
			<div className="grid grid-cols-8 gap-1">
				<div className="col-start-3 col-end-7">
					<ProfileImage>
						<Image src={myImage} alt="my-image" />
					</ProfileImage>
				</div>
			</div>
		</>
	);
}

export default MyImg;
