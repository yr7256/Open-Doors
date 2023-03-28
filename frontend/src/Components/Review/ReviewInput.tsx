import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, P } from '../../styles/Review/ReviewInputstyle';
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
	const [starScore, setStarScore] = useState(0);
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
	const handleFileUpload = () => {
		// do something with the selected files
		console.log(selectedFiles);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(review, selectedFiles, starScore);
	};

	const reviewRegister = async () => {
		const requestInfo = {
			url: '',
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			data: {
				spotId: '',
				username: username,
				reviewScore: starScore,
				reviewContent: review,
			},
		};
		try {
			const submitReviewForm = await axios(requestInfo);
			console.log(submitReviewForm);
		} catch (err) {
			console.log(err);
		}
	};

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
						<P>사진 등록</P>
						<PhotoButton>
							<input type="file" multiple onChange={handleFileSelect} />
							사진 추가
						</PhotoButton>
						{selectedFiles.length > 0 && (
							<ul>
								{selectedFiles.map((file, index) => (
									<li key={index}>
										<img src={URL.createObjectURL(file)} alt={file.name} />
										<button onClick={() => handleFileDelete(file)}>Delete</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<Button type="submit" onClick={reviewRegister}>
					리뷰 등록하기
				</Button>
			</form>
		</>
	);
}

export default ReviewInput;
