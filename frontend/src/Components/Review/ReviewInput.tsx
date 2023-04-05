import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, P, Img } from '../../styles/Review/ReviewInputstyle';
import { Button, PhotoButton, CancelIcon } from '../../styles/Button/ButtonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { StarContainer } from '../../styles/Review/ReviewInputstyle';
import cancel from '../../assets/img/cancel.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type UserState = {
	user: {
		username: string;
		accessToken: string;
	};
};

function ReviewInput() {
	const [review, setReview] = useState('');
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [starScore, setStarScore] = useState(3);
	const [reviewData, setReviewData] = useState<[]>([]);

	const score = [1, 2, 3, 4, 5];
	const username = useSelector((state: UserState) => state.user.username);
	const accessToken = useSelector((state: UserState) => state.user.accessToken);
	const { id } = useParams();
	const navigate = useNavigate();
	// console.log(id);

	const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
	};

	const reviewRegister = async () => {
		try {
			const formData = new FormData();
			const body = {
				spotId: id,
				username: username,
				reviewScore: starScore,
				reviewContent: review,
			};
			Array.from(selectedFiles).forEach((img) => formData.append('reviewImages', img));
			const json = JSON.stringify(body);
			const blob = new Blob([json], { type: 'application/json' });
			formData.append('reviewDto', blob);

			if (selectedFiles.length === 0) {
				await axios
					.post('https://j8b205.p.ssafy.io/api/review/save', formData, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					})
					.then((res) => {
						console.log(res);
						setReviewData(res.data);
					});
			} else {
				await axios
					.post('https://j8b205.p.ssafy.io/api/review/save', formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${accessToken}`,
						},
					})
					.then((res) => {
						console.log(res);
						setReviewData(res.data);
					});
			}
			navigate(`/map/detail/${id}/Review`);
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
					{/* <div className="col-start-4 col-span-2">{starScore}.0</div> */}
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
						<Form placeholder="여러분의 후기를 적어주세요!" onChange={onChangeReview}></Form>
					</div>
				</div>
				<div className="grid grid-cols-8 gap-1">
					<div className="col-start-2 col-span-6">
						<P>사진 등록</P>
						<PhotoButton>
							<label htmlFor="add-image">사진 추가</label>
							<input
								type="file"
								multiple
								className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
								onChange={handleFileSelect}
								id="add-image"
								accept="image/jpg,impge/png,image/jpeg"
								style={{ display: 'none' }}
							/>
						</PhotoButton>
						{selectedFiles.length > 0 && (
							<ul>
								{selectedFiles.map((file, index) => (
									<li key={index}>
										<Img src={URL.createObjectURL(file)} alt={file.name} />
										<button onClick={() => handleFileDelete(file)}>
											<CancelIcon src={cancel} alt="cancel" />
										</button>
									</li>
								))}
							</ul>
						)}

						<Button type="submit" onClick={reviewRegister} id="register-review">
							리뷰 등록하기
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}

export default ReviewInput;
