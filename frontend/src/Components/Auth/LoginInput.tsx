import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Banner, Img, P, Notyet } from '../../styles/Auth/LoginInputstyle';
import { Label, Message, Input } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';
import Loginimg from '../../assets/img/login.png';
import { loginAccount } from '../../store/AuthSlice';

function LoginInput() {
	//Login 초기값
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
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
	};

	// 로그인 post 보내기
	const submitLogin = async () => {
		const loginPayload = {
			username: username,
			password: password,
		};

		const loginPost = {
			url: '/api/user/login',
			method: 'POST',
			data: loginPayload,
		};
		try {
			const loginRequest = await axios(loginPost);
			const accessToken = loginRequest.data.accessToken;

			// 로그인 성공 후 액세스 토큰을 리프레시 토큰에 저장 (리프레시 토큰 백엔드 미구현)
			// const refreshToken = loginRequest.data.refresh_token;

			// 로컬 스토리지에 액세스 토큰 저장
			localStorage.setItem('accessToken', accessToken);
			// setCookie(refreshToken);

			// dispatch를 위해 get해서 유저정보 불러오기
			axios
				.get('https://j8b205.p.ssafy.io/api/user/', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				.then((response) => {
					const name = response.data.name;
					dispatch(loginAccount({ username: username, password: password, accessToken: accessToken, name: name }));
				})
				.catch((err) => {
					// console.log(err)
					alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
				});

			navigate('/map');
		} catch (err: any) {
			if (err.response) {
				// 서버에서 반환된 에러 메시지를 사용자에게 표시
				setErrorMessage(err.response.data.message);
			} else {
				alert('네트워크 오류로 인해 로그인에 실패했습니다.');
				// console.log('네트워크 오류로 인해 로그인에 실패했습니다.');
			}
			// console.log(err);
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
				<div className="flex justify-center">
					<div className="flex flex-col">
						<Label>아이디</Label>
						<Input id="id" name="id" placeholder={'   아이디'} onChange={handleIdChange} />
						<br />
						<br />
						<Label>비밀번호</Label>
						<Input
							id="password"
							name="password"
							type="password"
							autoComplete="off"
							placeholder={'   비밀번호'}
							onChange={handlePasswordChange}
						/>
						<Message>{errorMessage}</Message>

						<div>
							<Button onClick={submitLogin}>로그인</Button>
							<Notyet>아직 가입을 하지 않으셨나요?</Notyet>
							<Button onClick={moveSignup}>가입 하러가기</Button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default LoginInput;
