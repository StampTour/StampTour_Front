import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Login = () => {
	const navigate = useNavigate();
	const [, setCookies] = useCookies(["token"]);
	const [userid, setUserid] = useState("");
	const [password, setPassword] = useState("");
	const [pwValid, setPWValid] = useState(false);
	const [notAllow, setNotAllow] = useState(true);
	const [warning, setWarning] = useState("");

	useEffect(() => {
		if (pwValid) {
			setNotAllow(false);
			return;
		}
		setNotAllow(true);
	}, [pwValid]);

	const getUserid = (e) => {
		setUserid(e.target.value);
	};

	const getPassword = (e) => {
		setPassword(e.target.value);
		const regex = /^\d{4}$/;
		// const regex = /^\d{4,6}$/;

		if (regex.test(e.target.value)) {
			setPWValid(true);
		} else {
			setPWValid(false);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://stamptour.xyz/api/login",
				{
					userRequest: {
						userid: userid,
						password: password,
					},
					stampRequest: {
						id: "",
					},
				}
			);
			if (response.status === 200) {
				setCookies("token", response.data.token, {
					path: "/",
				});
				navigate("/Yangcheon");
			} else {
				console.error(
					"조건이 충족되지 않음",
					response.data
				);
			}
		} catch (error) {
			console.error("오류", error);
			setWarning(
				"이미 존재하는 이름입니다! 다른 이름을 입력해주세요😂"
			);
		}
	};

	return (
		<div className='h-screen flex items-center justify-center bg-[#bfeefe]'>
			<div id='header' className='pt-[30px] pb-[10px] '>
				<div className='Titlefont flex flex-col items-center text-[45px] pb-[30px] drop-shadow-lg'>
					<span className=''>체험존</span>
					<span className=''>스탬프 투어</span>
				</div>
				<div className='flex flex-row justify-center my-[20px] pb-[10px]'>
					<div className='Stampfont flex flex-col items-center text-[15px] text-[black]'>
						<span className='mb-[3px]'>
							반갑습니다! 스탬프 투어에 오신걸 환영해요🥰
						</span>
						<span className='mb-[15px]'>
							<b className='text-[#fe904c]'>
								이름과 비밀번호
							</b>
							를 작성해주세요!😀
						</span>
						<span className='mb-[3px]'>
							※ 스탬프 투어 중 &nbsp;
							<b className='text-[#fe904c]'>
								웹페이지가 꺼진 경우,
							</b>
						</span>
						<span className='mb-[3px]'>
							<b className='text-[#fe904c]'>
								처음에 입력했던 정보
							</b>
							를 입력해주세요!
						</span>
					</div>
				</div>
				<form className='Mainfont' onSubmit={onSubmit}>
					<div className='flex flex-col items-start'>
						<label className='text-[15px]'>이름</label>
						<input
							onChange={getUserid}
							value={userid}
							className={`w-full bg-[#f9fafb] border-[1px] border-[#c2c8cf] rounded-[10px] ${
								warning.length > 0 ? "" : "mb-[20px]"
							} mt-[5px] px-[16px] py-[5px]`}
							placeholder='이름을 입력해주세요!'
							type='text'
							required
						/>
						{warning.length > 0 && (
							<div className='text-[13px] text-red-500 mb-[10px]'>
								{warning}
							</div>
						)}
					</div>
					<div className='flex flex-col items-start'>
						<label className='flex flex-col items-start text-[15px]'>
							비밀번호
						</label>
						<input
							onChange={getPassword}
							value={password}
							className={`w-full bg-[#f9fafb] border-[1px] border-[#c2c8cf] rounded-[10px] ${
								warning.length > 0 ? "" : "mb-[5px]"
							} mt-[5px] px-[16px] py-[5px]`}
							placeholder='비밀번호를 입력해주세요!'
							type='text'
							required
						/>
						{!pwValid && password.length > 0 && (
							<div className='text-[13px] text-red-500'>
								숫자 4개를 입력해주세요.
							</div>
						)}
					</div>
					<div className='flex flex-col items-center'>
						<button
							type='submit'
							disabled={notAllow}
							className={`flex items-center justify-center w-full h-[43px] ${
								warning.length > 0
									? "mt-[30px]"
									: "mt-[20px]"
							} rounded-[10px] bg-[#208df9] text-white font-medium drop-shadow-md
							disabled:bg-[#F0F0F0] disabled:text-[black] disabled:drop-shadow-md`}
						>
							스탬프 투어 시작 !
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
