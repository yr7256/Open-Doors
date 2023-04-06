import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, ChangeEvent } from 'react';
import { Input, Label, Message, ChangeInput } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';
import { loginAccount } from '../../store/AuthSlice';

type UserState = {
	user: {
		username: string;
		accessToken: string;
	};
};

function ChangePassword() {
	const accessToken = useSelector((state: UserState) => state.user.accessToken);
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');
	const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
	const [isPassword, setIsPassword] = useState(false);
	const [isPasswordCheck, setIsPasswordCheck] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleCurrentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const currentPassword = e.target.value;
		setPassword(currentPassword);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		const currentPassword = e.target.value;
		setNewPassword(currentPassword);
		const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
		if (!passwordRegExp.test(currentPassword)) {
			setPasswordMessage('안전하지 않은 비밀번호 입니다.');
			setIsPassword(false);
		} else {
			setPasswordMessage('안전한 비밀번호 입니다.');
			setIsPassword(true);
		}
	};
	const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
		const currentPasswordConfirm = e.target.value;
		setPasswordCheck(currentPasswordConfirm);
		if (newPassword !== currentPasswordConfirm) {
			setPasswordCheckMessage('비밀번호가 똑같지 않습니다!');
			setIsPasswordCheck(false);
		} else {
			setPasswordCheckMessage('똑같은 비밀번호를 입력했습니다.');
			setIsPasswordCheck(true);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const changePassword = async () => {
		const changePasswordRequest = {
			url: 'https://j8b205.p.ssafy.io/api/user/change/password',
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			data: {
				beforePassword: password,
				newPassword: newPassword,
			},
		};
		try {
			const changePasswordResult = await axios(changePasswordRequest);
			navigate('/Mypage/MyInfoManage');
			axios
				.get('https://j8b205.p.ssafy.io/api/user/', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				.then((response) => {
					// setUserDispatch(response);
					const name = response.data.name;
					const username = response.data.username;
					dispatch(loginAccount({ username: username, password: newPassword, accessToken: accessToken, name: name }));
				})
				.catch((err) => console.log(err));
		} catch (err) {
			// console.log(err);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-12 gap-1">
					<div className="col-start-2 col-end-9">
						<Label>현재 비밀번호</Label>
						<ChangeInput id="currentpassword" onChange={handleCurrentInput}></ChangeInput>
					</div>
				</div>
				<div className="grid grid-cols-12 gap-1">
					<div className="col-start-2 col-end-9">
						<Label>새 비밀번호</Label>
						<Input
							id="newwpassword"
							value={newPassword}
							onChange={onChangePassword}
							placeholder={'   영문, 숫자, 특수문자 포함 8자 이상'}
						></Input>
						<Message className="message">{passwordMessage}</Message>
					</div>
				</div>
				<div className="grid grid-cols-12 gap-1">
					<div className="col-start-2 col-end-9">
						<Label>비밀번호 확인</Label>
						<Input
							id="confirmpassword"
							value={passwordCheck}
							onChange={onChangePasswordConfirm}
							placeholder={'   비밀번호 확인'}
						></Input>
						<Message className="message">{passwordCheckMessage}</Message>
					</div>
				</div>
				<br />
				<div className="grid grid-cols-12 gap-1">
					<div className="col-start-2 col-end-6">
						<Button type="submit" onClick={changePassword}>
							변경하기
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}

export default ChangePassword;
