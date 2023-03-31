import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ModalBackGround, ModalWrap, ModalContainer, P } from '../../styles/Auth/Withdrawalstyle';
import { MiniButton } from '../../styles/Button/ButtonStyle';
import { logout } from '../../store/Cookie';
import { logoutAccount } from '../../store/AuthSlice';

type Props = {
	title?: string;
	alert?: string;
	closeModal?: () => void;
};

type UserState = {
	user: {
		username: string;
		password: string;
	};
};

function Withdrawal({ title, alert, closeModal }: Props) {
	const userId = useSelector((state: UserState) => state.user.username);
	const password = useSelector((state: UserState) => state.user.password);
	const dispatch = useDispatch();

	const DeleteUser = () => {
		const accessToken = localStorage.getItem('accessToken');
		axios
			.delete(`/api/user/${userId}`, {
				data: {
					password: password,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then(() => {
				console.log('회원탈퇴라니');
				dispatch(logoutAccount());
				logout();
			})
			.catch((err) => {
				console.log(err);
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
