import React, { useState, useCallback, ChangeEvent } from 'react';
import { Head, Line } from '../../styles/Nav/NavStyle';
import { Input, Label, Checkbox, Message, Ptag2, Condition, Div } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';
import Birthday from './Birthday';
// import { Top } from '../../styles/Auth/SignUpInputstyle';
// import useInput from "../../hooks/useInput";
// import FacilitesInput from "./FacilitesInput";
// import { User } from "../../types/auth";

type Facility = {
	id: number;
	label: string;
};
type Gender = 'male' | 'female';

function SignUpInput() {
	const facilitiesList: Facility[] = [
		{ id: 1, label: '휠체어 접근 가능' },
		{ id: 2, label: '해당 장소가 1층에 위치함' },
		{ id: 3, label: '장애인 화장실 있음' },
		{ id: 4, label: '애완견/도우미견 출입 가능' },
		{ id: 5, label: '장애인 엘리베이터 있음' },
		{ id: 6, label: '엘리베이터 있음' },
		{ id: 7, label: '건물 내 무료 주차 가능' },
		{ id: 8, label: '가족/어린이 이용에 적합' },
	];
	const [isChecked, setIsChecked] = useState(false);
	const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);

	const toggleCheckbox = (facility: Facility) => {
		if (selectedFacilities.some((f) => f.id === facility.id)) {
			setSelectedFacilities(selectedFacilities.filter((f) => f.id !== facility.id));
		} else {
			setSelectedFacilities([...selectedFacilities, facility]);
		}
	};

	// 회원가입 초기값
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [name, setName] = useState('');
	const [birth, setBirth] = useState('');
	const [gender, setGender] = useState<Gender>('male');

	// 오류메세지 상태 저장
	const [idMessage, setIdMessage] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');
	const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
	const [nameMessage, setNameMessage] = useState('');
	const [birthMessage, setBirthMessage] = useState('');

	// 유효성 검사
	const [isId, setIsId] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isPasswordCheck, setIsPasswordCheck] = useState(false);
	const [isName, setIsName] = useState(false);
	const [isBirth, setIsBirth] = useState(false);

	const isSignUpButtonDisabled = !(id && password && passwordCheck && name);

	const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
		const currentId = e.target.value;
		setId(currentId);
		const idRegExp = /^[a-zA-z0-9]{4,15}$/;

		if (!idRegExp.test(currentId)) {
			setIdMessage('');
			setIsId(false);
		} else {
			setIdMessage('사용가능한 아이디 입니다.');
			setIsId(true);
		}
	};

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		const currentName = e.target.value;
		setName(currentName);

		if (currentName.length < 2 || currentName.length > 10) {
			setNameMessage('이름은 2글자 이상 10글자 이하로 입력해주세요!');
			setIsName(false);
		} else {
			setIsName(true);
		}
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		const currentPassword = e.target.value;
		setPassword(currentPassword);
		const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
		if (!passwordRegExp.test(currentPassword)) {
			setPasswordMessage('');
			setIsPassword(false);
		} else {
			setPasswordMessage('안전한 비밀번호 입니다.');
			setIsPassword(true);
		}
	};
	const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
		const currentPasswordConfirm = e.target.value;
		setPasswordCheck(currentPasswordConfirm);
		if (password !== currentPasswordConfirm) {
			setPasswordCheckMessage('비밀번호가 똑같지 않습니다!');
			setIsPasswordCheck(false);
		} else {
			setPasswordCheckMessage('똑같은 비밀번호를 입력했습니다.');
			setIsPasswordCheck(true);
		}
	};

	const onChangeBirth = (e: ChangeEvent<HTMLInputElement>) => {
		const currentBirth = e.target.value;
		setBirth(currentBirth);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isChecked) {
			console.log(selectedFacilities, name, birth, id, password);
		} else {
			console.log(name, birth, id, password);
		}
	};
	return (
		<>
			<Head>회원가입</Head>
			<Line />
			<form onSubmit={handleSubmit}>
				<Label htmlFor="id">아이디</Label> <br />
				<Input id="id" name="id" value={id} onChange={onChangeId} placeholder={'   영문, 숫자 포함 4~15자'} />
				<Message className="message"> {idMessage} </Message>
				<div className="form-el">
					<Label htmlFor="password">비밀번호</Label> <br />
					<Input
						id="password"
						name="password"
						value={'*'.repeat(password.length)}
						onChange={onChangePassword}
						placeholder={'   영문, 숫자, 특수문자 포함 8자 이상'}
					/>
					<Message className="message">{passwordMessage}</Message>
				</div>
				<div className="form-el">
					<Label htmlFor="passwordConfirm">비밀번호 확인</Label> <br />
					<Input
						id="passwordConfirm"
						name="passwordConfirm"
						value={'*'.repeat(passwordCheck.length)}
						onChange={onChangePasswordConfirm}
						placeholder={'  비밀번호 확인'}
					/>
					<Message className="message">{passwordCheckMessage}</Message>
				</div>
				<Label htmlFor="name">이름</Label> <br />
				<Input id="name" name="name" value={name} onChange={onChangeName} placeholder={'  이름'} />
				<Message className="message">{nameMessage}</Message>
				<div className="form-el">
					<Birthday></Birthday>
				</div>
				<Label>성별</Label>
				<br />
				<Checkbox type="checkbox" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
				남성
				<Checkbox type="checkbox" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
				여성
				<br />
				<br />
				<Label>배리어프리 여부(중복선택 가능)</Label>
				<Div>
					<Ptag2>선택하신 조건은</Ptag2>
					<Ptag2>가입 후, 마이페이지에서 변경 가능 합니다.</Ptag2>
				</Div>
				{facilitiesList.map((facility) => (
					<div key={facility.id}>
						<Label>
							<Condition
								type="checkbox"
								checked={selectedFacilities.some((f) => f.id === facility.id)}
								onChange={() => toggleCheckbox(facility)}
							/>
							{facility.label}
						</Label>
					</div>
				))}
				<br />
				<Button type="submit" disabled={isSignUpButtonDisabled}>
					가입하기
				</Button>
			</form>
		</>
	);
}
export default SignUpInput;
