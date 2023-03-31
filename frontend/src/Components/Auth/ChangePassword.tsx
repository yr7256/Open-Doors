import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState, ChangeEvent } from 'react';
import { Input, Label, Message, ChangeInput } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';

type UserState = {
	user: {
		username: string;
	};
};

function ChangePassword() {
	const userId = useSelector((state: UserState) => state.user.username);
	console.log(userId);
	const [isChecked, setIsChecked] = useState(false);
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');
	const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
	const [isPassword, setIsPassword] = useState(false);
	const [isPasswordCheck, setIsPasswordCheck] = useState(false);
	const navigate = useNavigate();

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
		if (isChecked) {
			console.log(newPassword);
		} else {
			// console.log(realName, id, password, formBirth, selectedFacilities, gender);
		}
	};

	const changePassword = async () => {
		const accessToken = localStorage.getItem('accessToken');
		const changePasswordRequest = {
			url: `http://j8b205.p.ssafy.io:8080/api/user/${userId}`,
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			data: {
				password: password,
				new_password: newPassword,
			},
		};
		try {
			const changePasswordResult = await axios(changePasswordRequest);
			console.log(changePasswordResult);
			console.log('비밀번호 변경이 완료되었습니다.');
			navigate('/MyInfoManage');
		} catch (err) {
			console.log('비밀번호 변경 에러다');
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<Label>현재 비밀번호</Label>
					<ChangeInput id="currentpassword" onChange={handleCurrentInput}></ChangeInput>
				</div>
				<div>
					<Label>새 비밀번호</Label>
					<Input
						id="newwpassword"
						value={newPassword}
						onChange={onChangePassword}
						placeholder={'   영문, 숫자, 특수문자 포함 8자 이상'}
					></Input>
					<Message className="message">{passwordMessage}</Message>
				</div>
				<div>
					<Label>비밀번호 확인</Label>
					<Input
						id="confirmpassword"
						value={passwordCheck}
						onChange={onChangePasswordConfirm}
						placeholder={'   비밀번호 확인'}
					></Input>
					<Message className="message">{passwordCheckMessage}</Message>
				</div>
				<br />
				<Button type="submit" onClick={changePassword}>
					변경하기
				</Button>
			</form>
		</>
	);
}

export default ChangePassword;
