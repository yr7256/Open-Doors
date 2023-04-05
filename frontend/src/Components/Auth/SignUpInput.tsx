import React, { useState, useCallback, ChangeEvent } from 'react';
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

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
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

	const onChangeId = (e: any) => {
		const currentId = e.target.value;
		setId(currentId);
		const idRegExp = /^[a-zA-z0-9]{4,15}$/;

		if (!idRegExp.test(currentId)) {
			setIdMessage('4-15사이 대소문자 또는 숫자만 입력해 주세요!');
			setIsId(false);
		} else {
			setIdMessage('사용가능한 아이디 입니다.');
			setIsId(true);
		}
	};

	const onChangeName = (e: any) => {
		const currentName = e.target.value;
		setName(currentName);

		if (currentName.length < 2 || currentName.length > 10) {
			setNameMessage('이름은 2글자 이상 10글자 이하로 입력해주세요!');
			setIsName(false);
		} else {
			setIsName(true);
		}
	};

	const onChangePassword = (e: any) => {
		const currentPassword = e.target.value;
		setPassword(currentPassword);
		const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
		if (!passwordRegExp.test(currentPassword)) {
			setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
			setIsPassword(false);
		} else {
			setPasswordMessage('안전한 비밀번호 입니다.');
			setIsPassword(true);
		}
	};
	const onChangePasswordConfirm = (e: any) => {
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

	const onChangeBirth = (e: any) => {
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
			<h3>Sign Up</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="id">Id</label> <br />
				<input id="id" name="id" value={id} onChange={onChangeId} />
				<p className="message"> {idMessage} </p>
				<label htmlFor="name">Name</label> <br />
				<input id="name" name="name" value={name} onChange={onChangeName} />
				<p className="message">{nameMessage}</p>
				<div className="form-el">
					<label htmlFor="password">Password</label> <br />
					<input id="password" name="password" value={'*'.repeat(password.length)} onChange={onChangePassword} />
					<p className="message">{passwordMessage}</p>
				</div>
				<div className="form-el">
					<label htmlFor="passwordConfirm">Password Confirm</label> <br />
					<input
						id="passwordConfirm"
						name="passwordConfirm"
						value={'*'.repeat(passwordCheck.length)}
						onChange={onChangePasswordConfirm}
					/>
					<p className="message">{passwordCheckMessage}</p>
				</div>
				<div className="form-el">
					<label htmlFor="birth">Birth</label> <br />
					<input type="date" id="birth" name="birth" value={birth} onChange={onChangeBirth} />
				</div>
				<br />
				<br />
				<label>
					성별:
					<input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
					남성
					<input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
					여성
				</label>
				<br />
				<br />
				<label>
					<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
					편의시설을 이용하시는 데 필요한 항목을 선택하세요.
				</label>
				{isChecked &&
					facilitiesList.map((facility) => (
						<div key={facility.id}>
							<label>
								<input
									type="checkbox"
									checked={selectedFacilities.some((f) => f.id === facility.id)}
									onChange={() => toggleCheckbox(facility)}
								/>
								{facility.label}
							</label>
						</div>
					))}
				<button type="submit" disabled={isSignUpButtonDisabled}>
					submit
				</button>
			</form>
		</>
	);
}
export default SignUpInput;
