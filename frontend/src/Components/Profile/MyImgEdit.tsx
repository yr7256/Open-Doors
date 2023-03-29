// import React, { useRef, useState } from 'react';

// function MyImgEdit() {
// 	const inputRef = useRef(null);
// 	const [image, setImage] = useState('');

// 	const handleClick = () => {
// 		inputRef.current.click();
// 	};

// 	const handleImagechange = (e: any) => {
// 		const file = e.target.files[0];
// 		const reader = new FileReader();
// 		reader.onload = () => {
// 			if (reader.readyState === 2) {
// 				setImage(reader.result);
// 			}
// 		};
// 		reader.readAsDataURL(file);
// 	};
// 	return <div />;
// }

// export default MyImgEdit;
import React, { useState, useRef } from 'react';
import axios from 'axios';
import basicimg from '../../assets/img/basicimg.png';
import addimage from '../../assets/img/addImage.png';
import { Image, ProfileImage, ButtonBackground, ButtonImage } from '../../styles/Profile/MyImgstyle';
import { useSelector } from 'react-redux';

type UserState = {
	user: {
		userImg: string;
	};
};

function MyEditImg(props: any) {
	const { image, onChange: setImage } = props;
	const userImg = useSelector((state: UserState) => state.user.userImg);

	let renderingImage;
	if (image) {
		renderingImage = URL.createObjectURL(image);
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('등록 완료');
	};

	const changeImage = async (e: any) => {
		const changeImageRequest = {
			url: '',
			method: 'POST',
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
			data: {
				picture: e.target.files[0],
			},
		};
		try {
			const submitImage = await axios(changeImageRequest);
			console.log(submitImage);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="grid grid-cols-8 gap-1">
				<div className="col-start-3 col-end-7">
					<form onSubmit={handleSubmit}>
						<ProfileImage>
							{userImg === null ? <Image src={basicimg} alt="My Image"></Image> : userImg}
							<ButtonBackground>
								{/* <input type="file" accept=".jpg, .jpeg, .png" onChange={changeImage} /> */}
								<ButtonImage src={addimage} alt="add Image"></ButtonImage>
							</ButtonBackground>
						</ProfileImage>
					</form>
				</div>
			</div>
		</>
	);
}

export default MyEditImg;
