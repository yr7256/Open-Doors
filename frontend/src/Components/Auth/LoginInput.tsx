import React, { useState } from 'react';
import { Head, BannerLine } from '../../styles/Nav/NavStyle';
import { Banner, Img, P, Notyet } from '../../styles/Auth/LoginInputstyle';
import { Input, Label } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';
import Loginimg from '../../assets/img/login.png';

function LoginInput() {
	//Login 초기값
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	return (
		<>
			<Head>
				<h1>로그인</h1>
			</Head>
			<BannerLine />
			<Banner>
				<P>로그인을 하시면,</P>
				<Img src={Loginimg} />
				<P>더 많은 서비스를 이용할 수 있습니다.</P>
			</Banner>
			<div>
				<Label>아이디</Label>
				<Input id="id" name="id" placeholder={'   아이디'} />
			</div>
			<div>
				<Label>비밀번호</Label>
				<Input id="password" name="password" placeholder={'   비밀번호'} />
			</div>
			<Button>로그인</Button>
			<Notyet>아직 가입을 하지 않으셨나요?</Notyet>
			<Button>가입 하러가기</Button>
		</>
	);
}

export default LoginInput;
