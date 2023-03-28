import React, { ReactElement, SetStateAction, useEffect, useState, Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { StarContainer } from '../../styles/Review/ReviewInputstyle';

interface RatigSectionProps {
	ratingIndex: number;
	setRatingIndex: Dispatch<SetStateAction<number>>;
}

function StarInput() {
	const [clicked, setClicked] = useState(0);
	const score = [0, 1, 2, 3, 4];
	const [reviewStar, setReviewStar] = useState([false, false, false, false, false]);
	// const starScore = (index: number) => {
	// 	const star = [...reviewStar];
	// 	for (let i = 0; i < 5; i++) {
	// 		star[i] = i <= index ? true : false;
	// 	}
	// 	setReviewStar(star);
	// };
	// const EmptyStar = (
	// 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-stone-300">
	// 		<path
	// 			fillRule="evenodd"
	// 			d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
	// 			clipRule="evenodd"
	// 		/>
	// 	</svg>
	// );

	// const FullStar = (
	// 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-yellow-300">
	// 		<path
	// 			fillRule="evenodd"
	// 			d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
	// 			clipRule="evenodd"
	// 		/>
	// 	</svg>
	// );

	// const HalfStar = (
	// 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-stone-300">
	// 		<clipPath id="firstStarClip">
	// 			<rect width="0.75rem" height="0.75rem" />
	// 		</clipPath>
	// 		<path
	// 			fillRule="evenodd"
	// 			d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
	// 			clipRule="evenodd"
	// 		/>
	// 		<use clipPath="url(#firstStarClip)" href="#evenodd" fill="#fde047" />
	// 	</svg>
	// );

	return (
		<>
			<p>별점주기</p>
			{clicked + 1}.0
			<StarContainer>
				{score.map((el) => (
					<FontAwesomeIcon icon={clicked >= el ? faSolidStar : faRegularStar} key={el} onClick={() => setClicked(el)} />
				))}
			</StarContainer>
			<div className="starBox"></div>
		</>
	);
}

export default StarInput;
