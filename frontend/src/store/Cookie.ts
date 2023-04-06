import Cookies from 'universal-cookie';

const cookies = new Cookies();

// https가 되면 이 조건을 쓸거임 { sameSite: 'none', secure: true }
export function setCookie(refresh_token: string) {
	cookies.set('refresh_token', refresh_token, { sameSite: 'none', secure: true });
}

export function logout() {
	window.localStorage.removeItem('accessToken');
	cookies.remove('refreshToken');
}
