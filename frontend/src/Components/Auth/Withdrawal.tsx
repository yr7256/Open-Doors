import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ModalBackGround, ModalWrap, ModalContainer, P } from '../../styles/Auth/Withdrawalstyle';
import { MiniButton } from '../../styles/Button/ButtonStyle';
import { logout } from '../../store/Cookie';
import { logoutAccount } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
	title?: string;
	alert?: string;
	closeModal?: () => void;
};

type UserState = {
	user: {
		username: string;
		password: string;
		accessToken: string;
	};
};

function Withdrawal({ title, alert, closeModal }: Props) {
	const password = useSelector((state: UserState) => state.user.password);
	const accessToken = useSelector((state: UserState) => state.user.accessToken);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const DeleteUser = () => {
		axios
			.delete('https://j8b205.p.ssafy.io/api/user/delete', {
				data: {
					password: password,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then(() => {
				dispatch(logoutAccount());
				logout();
				navigate('/signup');
			})
			.catch((err) => {
				// console.log(err);
			});
	};

	return (
		<>
			<ModalWrap>
				<ModalBackGround onClick={closeModal} />
				<ModalContainer>
					<h2>{title}</h2>
					<P>{alert}</P>
					<div>
						<MiniButton onClick={DeleteUser}>예</MiniButton>
						<MiniButton onClick={closeModal}>아니오</MiniButton>
					</div>
				</ModalContainer>
			</ModalWrap>
		</>
	);
}

export default Withdrawal;
