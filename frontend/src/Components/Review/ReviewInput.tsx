import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, P, Img } from '../../styles/Review/ReviewInputstyle';
import { Button, PhotoButton } from '../../styles/Button/ButtonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { StarContainer } from '../../styles/Review/ReviewInputstyle';

type UserState = {
	user: {
		username: string;
	};
};

function ReviewInput() {
	const [review, setReview] = useState('');
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [starScore, setStarScore] = useState(3);
	const score = [1, 2, 3, 4, 5];
	const username = useSelector((state: UserState) => state.user.username);

	const onChangeReview = (e: ChangeEvent<HTMLInputElement>) => {
		const currentReview = e.target.value;
		setReview(currentReview);
	};

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const filesArray = Array.from(event.target.files || []);
		setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...filesArray]);
	};
	const handleFileDelete = (file: File) => {
		setSelectedFiles((prevSelectedFiles) => prevSelectedFiles.filter((prevFile) => prevFile !== file));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(review, selectedFiles, starScore);
	};

	const reviewRegister = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			const body = {
				spotId: 2,
				username: 'ssafy8878',
				reviewScore: starScore,
				reviewContent: review,
			};
			Array.from(selectedFiles).forEach((img) => formData.append('reviewImages', img));
			const json = JSON.stringify(body);
			const blob = new Blob([json], { type: 'application/json' });
			formData.append('reviewDto', blob);
			const response = await axios.post('http://192.168.31.134:8080/api/review/save', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					// Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	// 	const requestInfo = {
	// 		url: 'http://192.168.31.134:8080/api/review/save',
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-type': 'application/json',
	// 		},
	// 		data: {
	// 			spotId: 2,
	// 			username: 'ssafy8878',
	// 			reviewScore: starScore,
	// 			reviewContent: review,
	// 		},
	// 	};
	// 	try {
	// 		const submitReviewForm = await axios(requestInfo);
	// 		console.log(submitReviewForm);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-8 gap-1">
					<div className="col-start-2 col-span-2">
						<P>별점주기</P>
					</div>
					<div className="col-start-4 col-span-2">{starScore}.0</div>
				</div>
				<div className="grid grid-cols-8 gap-1">
					<div className="col-start-2 col-span-2">
						<StarContainer>
							{score.map((el) => (
								<FontAwesomeIcon
									icon={starScore >= el ? faSolidStar : faRegularStar}
									key={el}
									onClick={() => setStarScore(el)}
									size="2x"
									color="#6393CB"
								/>
							))}
						</StarContainer>
					</div>
				</div>

				<div className="grid grid-cols-8 gap-1">
					<div className="col-start-2 col-span-6">
						<P>리뷰 작성하기</P>
						<Form onChange={onChangeReview}></Form>
					</div>
				</div>
				<div className="grid grid-cols-8 gap-1">
					<div className="col-start-2 col-span-6">
						<label htmlFor="add-image">
							<P>사진 등록</P>
						</label>
						<PhotoButton>
							사진 추가
							<input type="file" multiple onChange={handleFileSelect} id="add-image" />
						</PhotoButton>
						{selectedFiles.length > 0 && (
							<ul>
								{selectedFiles.map((file, index) => (
									<li key={index}>
										<Img src={URL.createObjectURL(file)} alt={file.name} />
										<button onClick={() => handleFileDelete(file)}>Delete</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<Button type="submit" onClick={reviewRegister} id="register-review">
					리뷰 등록하기
				</Button>
			</form>
		</>
	);
}

export default ReviewInput;
