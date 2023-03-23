import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Head, BannerLine } from '../../styles/Nav/NavStyle';
import { Banner, Img, P, Notyet, Input } from '../../styles/Auth/LoginInputstyle';
import { Label } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';
import Loginimg from '../../assets/img/login.png';

function LoginInput() {
	//Login 초기값
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setId(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isChecked) {
			console.log(id, password);
		} else {
			console.log(id, password);
		}
	};

	const dispatch = useDispatch();

	// 로그인 post 보내기
	const submitLogin = async () => {
		const loginPayload = {
			username: id,
			password: password,
		};
		console.log(loginPayload);

		const loginPost = {
			url: '',
			method: 'POST',
			data: JSON.stringify(loginPayload),
		};
		try {
			const loginRequest = await axios(loginPost);
			console.log(loginRequest);
			console.log('로그인이 완료되었습니다.');
		} catch (err) {
			console.log('로그인 안됐다');
			console.log(err);
		}
	};

	const navigate = useNavigate();
	const moveSignup = () => {
		navigate('/Signup');
	};

	return (
		<>
			<Head>
				<h1>로그인</h1>
			</Head>
			<BannerLine />
			<Banner>
				<div>
					<P>로그인을 하시면,</P>
					<Img src={Loginimg} />
				</div>
				<P>더 많은 서비스를 이용할 수 있습니다.</P>
			</Banner>
			<form onSubmit={handleSubmit}>
				<div>
					<Label>아이디</Label>
					<Input id="id" name="id" placeholder={'   아이디'} onChange={handleIdChange} />
				</div>
				<div>
					<Label>비밀번호</Label>
					<Input id="password" name="password" placeholder={'   비밀번호'} onChange={handlePasswordChange} />
				</div>
				<Button onClick={submitLogin}>로그인</Button>
			</form>
			<Notyet>아직 가입을 하지 않으셨나요?</Notyet>
			<Button onClick={moveSignup}>가입 하러가기</Button>
		</>
	);
}

export default LoginInput;
