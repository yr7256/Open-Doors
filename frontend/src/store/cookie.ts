import Cookies from 'universal-cookie';

const cookies = new Cookies();

// export function setRefrshTokenToCookie(refresh_token: string) {
// 	cookies.set('refresh_token', refresh_token, { sameSite: 'none', secure: true });
// }

export function logout() {
	console.log('localStorage set logout!');
	window.localStorage.removeItem('accessToken');
	cookies.remove('refreshToken');
}
