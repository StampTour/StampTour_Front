/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Login = () => {
	const [, setCookies] = useCookies(["JSESSIONID"]);
	const [userid, setUserid] = useState("");
	const navigate = useNavigate();

	const getUserid = (e) => {
		setUserid(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://stamptour.xyz/api/login",
				{
					userRequest: {
						userid: userid,
					},
					stampRequest: {
						id: "",
					},
				},
				{
					withCredentials: true,
				}
			);
			console.log("로그인:", response);
			if (response.status === 200) {
				setCookies("JSESSIONID", response.data.sessionId, {
					path: "/",
					sameSite: "None",
					secure: true,
					domain: process.env.REACT_APP_COOKIE_DOMAIN,
				});
				navigate("/Gwangjin");
			} else {
				console.error(
					"조건이 충족되지 않음",
					response.data
				);
			}
		} catch (error) {
			console.error("오류", error);
			alert("전송실패!!");
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
							<b className='text-[#fe904c]'>닉네임</b>을
							작성해주세요 !😀
						</span>
						<span className='mb-[3px]'>
							※ 스탬프 투어 중 &nbsp;
							<b className='text-[#fe904c]'>
								웹페이지가 꺼진 경우,
							</b>
						</span>
						<span className='mb-[3px]'>
							<b className='text-[#fe904c]'>
								처음에 입력했던 닉네임
							</b>
							을 다시 입력하면 됩니다!
						</span>
					</div>
				</div>
				<form className='Mainfont' onSubmit={onSubmit}>
					<div className='flex flex-col items-center'>
						<input
							onChange={getUserid}
							value={userid}
							className='w-[90%] bg-[#f9fafb] border-[1px] border-[#c2c8cf] rounded-[10px] mt-[12px] mb-[30px] px-[16px] py-[10px]'
							placeholder='닉네임을 입력해주세요 !'
							type='text'
							required
						/>
					</div>
					<div className='flex flex-col items-center'>
						<button
							type='submit'
							className='flex items-center justify-center w-[90%] h-[43px] rounded-[10px] bg-[#208df9] text-white font-medium'
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
