import React, { useState, ChangeEvent } from 'react';
import {
	Input,
	Label,
	Checkbox,
	Message,
	Ptag2,
	Condition,
	Div,
	Birthinput,
	BirtYearinput,
} from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';
import { Birth } from '../../types/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Facility = {
	id: number;
	label: string;
};
type Gender = 'male' | 'female';

function SignUpInput() {
	const navigate = useNavigate();
	const facilitiesList: Facility[] = [
		{ id: 1, label: '휠체어 접근 가능' },
		{ id: 2, label: '애완견/도우미견 출입 가능' },
		{ id: 3, label: '장애인 엘리베이터 있음' },
		{ id: 4, label: '건물 내 무료 주차 가능' },
		{ id: 5, label: '장애인 화장실 있음' },
		{ id: 6, label: '엘리베이터 있음' },
		{ id: 7, label: '가족/어린이 이용에 적합' },
		{ id: 8, label: '해당 장소가 1층에 위치함' },
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
	const [realName, setRealName] = useState('');
	const [formBirth, setFormBirth] = useState<Birth>({
		birthYear: '',
		birthMonth: '',
		birthDay: '',
	});
	const [gender, setGender] = useState<Gender>('male');

	// 오류메세지 상태 저장
	const [idMessage, setIdMessage] = useState('');
	const [idValidMessage, setIdValidMessage] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');
	const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
	const [nameMessage, setNameMessage] = useState('');

	// 유효성 검사
	const [isId, setIsId] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isPasswordCheck, setIsPasswordCheck] = useState(false);
	const [isName, setIsName] = useState(false);

	// 아이디 중복 검사
	const [isIdAvailable, setIsIdAvailable] = useState('');

	const isSignUpButtonDisabled = !(id && password && passwordCheck && realName);

	const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
		const currentId = e.target.value;
		setId(currentId);
		const idRegExp = /^[a-zA-z0-9]{4,15}$/;

		if (!idRegExp.test(currentId)) {
			setIdMessage('사용 불가능한 아이디 입니다.');
			setIsId(false);
		} else {
			setIdMessage('사용가능한 아이디 입니다.');
			setIsId(true);
		}
	};

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		const currentName = e.target.value;
		setRealName(currentName);

		if (currentName.length < 2 || currentName.length > 10) {
			setNameMessage('이름은 2글자 이상 10글자 이하로 입력해주세요');
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
		if (password !== currentPasswordConfirm) {
			setPasswordCheckMessage('비밀번호가 똑같지 않습니다!');
			setIsPasswordCheck(false);
		} else {
			setPasswordCheckMessage('똑같은 비밀번호를 입력했습니다.');
			setIsPasswordCheck(true);
		}
	};

	const handleBirthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormBirth({ ...formBirth, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	// 회원가입 post 보내기
	const submitRegister = async () => {
		const needs: any = [];
		for (const need of selectedFacilities) {
			needs.push(need.id);
		}

		const requestInfo = {
			url: 'https://j8b205.p.ssafy.io/api/user/save',
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			data: {
				user: {
					username: id,
					password: password,
					name: realName,
					gender: gender,
					birthDay: formBirth.birthDay,
					birthMonth: formBirth.birthMonth,
					birthYear: formBirth.birthYear,
				},
				sfInfoIds: needs,
			},
		};

		try {
			const submitUserForm = await axios(requestInfo);
			axios
				.get(`https://j8b205.p.ssafy.io/api/user/duplicate?id=${id}`)
				.then((res) => {
					navigate('/Login');
				})
				.catch((err) => {
					setIsIdAvailable('중복된 아이디입니다.');
				});
		} catch (err) {
			alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex justify-center">
					<div className="flex flex-col">
						<Label htmlFor="id">아이디</Label>
						<Input id="id" name="id" value={id} onChange={onChangeId} placeholder={'   영문, 숫자 포함 4~15자'} />
						<Message className="message">
							{isIdAvailable === '이미 가입된 아이디입니다.' ? isIdAvailable : idMessage}
						</Message>
						<div className="form-el">
							<Label htmlFor="password">비밀번호</Label> <br />
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="off"
								value={password}
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
								type="password"
								autoComplete="off"
								value={passwordCheck}
								onChange={onChangePasswordConfirm}
								placeholder={'  비밀번호 확인'}
							/>
							<Message className="message">{passwordCheckMessage}</Message>
						</div>
						<Label htmlFor="name">이름</Label>
						<Input id="name" name="name" value={realName} onChange={onChangeName} placeholder={'  이름'} />
						<Message className="message">{nameMessage}</Message>
						<Label>생년월일</Label>
						<div className="flex justify-center">
							<div className="mr-2">
								<BirtYearinput type="number" name="birthYear" value={formBirth.birthYear} onChange={handleBirthInput} />{' '}
								년
							</div>
							<div className="mr-2">
								<Birthinput type="number" name="birthMonth" value={formBirth.birthMonth} onChange={handleBirthInput} />{' '}
								월
							</div>
							<div className="mr-3">
								<Birthinput type="number" name="birthDay" value={formBirth.birthDay} onChange={handleBirthInput} /> 일
							</div>
						</div>
						<Label>성별</Label>
						<div className="flex mt-3">
							<div className="mr-3">
								<Checkbox type="checkbox" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
								남성
							</div>
							<div className="mr-3">
								<Checkbox
									type="checkbox"
									value="female"
									checked={gender === 'female'}
									onChange={() => setGender('female')}
								/>
								여성
							</div>
						</div>
						<div className="mb-8">
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
											checked={selectedFacilities.some((f: any) => f.id === facility.id)}
											onChange={() => toggleCheckbox(facility)}
										/>
										{facility.label}
									</Label>
								</div>
							))}
							<br />
							<Button type="submit" disabled={isSignUpButtonDisabled} onClick={submitRegister}>
								가입하기
							</Button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
export default SignUpInput;
