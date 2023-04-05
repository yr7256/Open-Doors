import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Recomendation from '../../assets/img/recomendation.png';
import Bookmark from '../../assets/img/Bookmark.png';
import Transportation from '../../assets/img/transportation.png';
import My from '../../assets/img/My.png';
import { FooterBlock, FooterPlace, Image, FooterP, Line } from '../../styles/Menu/FooterStyle';
import Modal from './Modal';
import { UserRecommendAction } from '../../store/UserRecommend';
import { useDispatch } from 'react-redux';

interface ModalState {
	[key: string]: boolean;
}

const Footer: React.FC = () => {
	const dispatch = useDispatch();
	const initialModalState: ModalState = {
		recommend: false,
		bookmark: false,
		trafficinfo: false,
	};
	const [modalState, setModalState] = useState(initialModalState);
	const openModal = (modalId: string) => {
		const newModalState = { ...initialModalState, [modalId]: true };
		setModalState(newModalState);
	};

	const closeModal = (modalId: string) => {
		setModalState({ ...modalState, [modalId]: false });
		dispatch(UserRecommendAction.recommendoff());
	};

	const navigate = useNavigate();

	const moveToMy = () => {
		navigate('/Mypage');
	};

	return (
		<>
			{Object.keys(initialModalState).map((modalId) => (
				<Modal
					key={modalId}
					id={modalId}
					title={modalId.toUpperCase()}
					show={modalState[modalId]}
					handleClose={() => closeModal(modalId)}
				>
					{/* <p>{modalId.toUpperCase()} content...</p> */}
				</Modal>
			))}
			<FooterPlace>
				<Line />
				<FooterBlock>
					<div onClick={() => openModal(Object.keys(initialModalState)[0])}>
						<Image src={Recomendation} />
						<FooterP>추천</FooterP>
					</div>
					<div onClick={() => openModal(Object.keys(initialModalState)[2])}>
						<Image src={Transportation} />
						<FooterP>교통정보</FooterP>
					</div>
					<div onClick={moveToMy}>
						<Image src={My} />
						<FooterP>MY</FooterP>
					</div>
				</FooterBlock>
			</FooterPlace>
		</>
	);
};

export default Footer;
