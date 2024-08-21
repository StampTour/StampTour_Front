/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {browserName} from "react-device-detect";

const Login = () => {
	const [, setCookies] = useCookies(["token"]);
	const [userid, setUserid] = useState("");
	const savedStampId = localStorage.getItem("stampedId");
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
				}
			);
			if (response.data.token) {
				setCookies("token", response.data.token, {
					path: "/",
					sameSite: "None",
					secure: true,
					domain: process.env.REACT_APP_COOKIE_DOMAIN,
				});
				localStorage.setItem("token", response.data.token);
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

	function redirectToChrome() {
		const currentUrl = new URL(window.location.href);
		const params = `stampedId=${savedStampId}`;

		// 기존 URL에 따라 적절하게 처리
		const separator = currentUrl.search ? "&" : "?";
		const chromeUrl =
			currentUrl.href.replace(
				/^https?:\/\//,
				"googlechrome://"
			) +
			separator +
			params;

		window.location.href = chromeUrl;

		setTimeout(() => {
			alert(
				"Chrome에서 링크를 열 수 없습니다. Chrome이 설치되어 있는지 확인하세요."
			);
		}, 500); // 0.5초 후에 경고 메시지 출력
	}

	useEffect(() => {
		if (browserName !== "Chrome") {
			if (
				window.confirm(
					"이 사이트는 Chrome에서 최적화되어 있습니다. Chrome을 사용해주세요. 크롬 페이지로 이동하시겠습니까?"
				)
			) {
				redirectToChrome();
			}
		} else {
			const urlParams = new URLSearchParams(
				window.location.search
			);
			const stampId = urlParams.get("stampedId");
			alert(`${stampId}`);

			if (stampId) {
				// localStorage에 저장
				localStorage.setItem("stampedId", stampId);
				console.log(`Stamp ID ${stampId} 저장 완료`);
			} else {
				console.log("stampId가 없습니다.");
			}
		}
	}, []);

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
