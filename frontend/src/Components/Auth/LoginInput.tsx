import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Banner, Img, P, Notyet, Input } from '../../styles/Auth/LoginInputstyle';
import { Label } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';
import Loginimg from '../../assets/img/login.png';
import { loginAccount } from '../../store/AuthSlice';
import { setCookie } from '../../store/Cookie';

function LoginInput() {
	//Login 초기값
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [userDispatch, setUserDispatch] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isChecked) {
			console.log(username, password);
		} else {
			console.log(username, password);
		}
	};

	// 로그인 post 보내기
	const submitLogin = async () => {
		const loginPayload = {
			username: username,
			password: password,
		};
		console.log(loginPayload);

		const loginPost = {
			// url: 'http://192.168.31.134:8080/api/auth/authenticate',
			url: `http://localhost:8080/api/login?username=${username}&password=${password}`,
			method: 'POST',
			// data: loginPayload,
		};
		try {
			const loginRequest = await axios(loginPost);
			console.log(loginRequest);

			// 로그인 성공 후 액세스 토큰을 리프레시 토큰에 저장
			// loginRequest가 어떻게 오냐에 따라서 뒤가 바뀔 수도 있음
			const accessToken = loginRequest.data.token;
			const refreshToken = loginRequest.data.refresh_token;

			// 로컬 스토리지에 액세스 토큰 저장
			localStorage.setItem('accessToken', accessToken);
			setCookie(refreshToken);

			// dispatch를 위해 get해서 유저정보 불러오기
			const userInfo = axios.get('').then((response) => {
				setUserDispatch(response.data);
				console.log(response.data);
				dispatch(loginAccount({ username: response.data.id, password: response.data.id, name: response.data.name }));
			});

			navigate('/MyPage');
			console.log('로그인이 완료되었습니다.');
		} catch (err: any) {
			console.log('로그인 안됐다');
			if (err.response) {
				// 서버에서 반환된 에러 메시지를 사용자에게 표시
				console.log(err.response.data.message);
			} else {
				console.log('네트워크 오류로 인해 로그인에 실패했습니다.');
			}
			console.log(err);
		}
	};

	const moveSignup = () => {
		navigate('/Signup');
	};

	return (
		<>
			<Banner>
				<div className="grid grid-cols-8 gap-1">
					<P className="col-start-1 col-span-4">로그인을 하시면,</P>
					<Img className="col-start-5 col-span-1" src={Loginimg}></Img>
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
					<Input
						id="password"
						name="password"
						type="password"
						placeholder={'   비밀번호'}
						onChange={handlePasswordChange}
					/>
				</div>
				<Button onClick={submitLogin}>로그인</Button>
			</form>
			<Notyet>아직 가입을 하지 않으셨나요?</Notyet>
			<Button onClick={moveSignup}>가입 하러가기</Button>
		</>
	);
}

export default LoginInput;
