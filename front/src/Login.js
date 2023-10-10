import React, { useState } from 'react';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [isRegistering, setIsRegistering] = useState(false); // 회원가입 모드 여부


	const handleLogin = () => {
		// 사용자 정보를 서버로 전송하기 위한 데이터 객체 생성
		const userData = {
			username: username,
			password: password,
		};

		// 서버 URL 설정
		const serverUrl = ''; // 실제 서버 URL 변경

		// Fetch API를 사용하여 POST 요청을 보냅니다.
		fetch(serverUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((data) => {
				// 서버 응답을 처리하세요.
				if (data.success) {
					setMessage('로그인 성공!');
				} else {
					setMessage('로그인 실패. 사용자 이름 또는 비밀번호가 올바르지 않습니다.');
				}
			})
			.catch((error) => {
				console.error('오류 발생:', error);
				setMessage('서버 오류가 발생했습니다.');
			});
	};

	const handleRegister = () => {
		// 회원가입 처리 로직을 구현
		// 서버로 사용자 정보를 전송
		const userData = {
			username: username,
			password: password,
		};

		// 서버로 POST 요청 보내기
		fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					setMessage('회원가입 성공!');
				} else {
					setMessage('회원가입 실패. 사용자 이름 또는 비밀번호가 이미 사용 중이거나 형식이 올바르지 않습니다.');
				}
			})
			.catch((error) => {
				console.error('오류 발생:', error);
				setMessage('서버 오류가 발생했습니다.');
			});
	};

	return (
		<div className="login-container">
			<h1>{isRegistering ? '회원가입' : '로그인'}</h1>
			<div>
				<label htmlFor="username">사용자 이름:</label>
				<input
					type="text"
					id="username"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="password">비밀번호:</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			{isRegistering ? (
				<button onClick={handleRegister}>회원가입</button>
			) : (
				<button onClick={handleLogin}>로그인</button>
			)}
			<div id="message" className="message">
				{message}
			</div>
			<p>
				{isRegistering ? '이미 계정이 있으신가요?   ' : '계정이 없으신가요?   '}
				<button onClick={() => setIsRegistering(!isRegistering)}>
					{isRegistering ? '로그인' : '회원가입'}
				</button>
			</p>
		</div>
	);
}
export default Login;