import React, {useState} from "react";
import axios from "axios";

const Input = () => {
	const [userid, setUserid] = useState();

	const getUserid = (e) => {
		setUserid(e.target.value);
		console.log(e.target.value);
	};

	const onSubmit = () => {
		axios
			.post("http://your-backend-url/api/endpoint", {
				userid,
			})
			.then((response) => {
				console.log("백앤드에 잘 보냄", response.data);
			})
			.catch((error) => {
				console.error("오류", error);
			});
	};

	return (
		<div className=''>
			<div
				id='header'
				className='pt-[30px] pb-[10px] bg-[#bfeefe] drop-shadow'
			>
				<div className='Titlefont flex flex-col items-center text-[45px] drop-shadow-lg'>
					<span className=''>체험존</span>
					<span className=''>스탬프 투어</span>
				</div>
				<div className='flex flex-row justify-center my-[20px]'>
					<div className='Stampfont flex flex-col items-center text-[15px] text-[black]'>
						<span className='mb-[3px]'>
							반갑습니다! 스탬프 투어에 오신걸 환영해요🥰
						</span>
						<span className='mb-[15px]'>
							자신의 이름 혹은 닉네임을 작성해주세요 !😀
						</span>
						<span className='mb-[3px]'>
							※ 스탬프 투어 중
							<b className='text-[#fe904c]'>
								웹페이지가 꺼진 경우,
							</b>
						</span>
						<span className='mb-[3px]'>
							처음에 입력했던 이름 혹은 닉네임을 다시
							입력하면 됩니다!
						</span>
					</div>
				</div>
				<form className='Mainfont' action=''>
					{/* 로그인 form */}
					<div className='flex flex-col items-center'>
						<input
							onChange={getUserid}
							value={userid}
							className='w-[90%] bg-[#f9fafb] border-[1px] border-[#c2c8cf] rounded-[10px] mt-[12px] mb-[30px] px-[16px] py-[5px]'
							placeholder='닉네임을 입력해주세요 !'
							type='text'
							required
						/>
					</div>
					<div className='flex flex-col items-center '>
						<button
							type='submit'
							className='flex items-center justify-center w-[90%] h-[40px] rounded-[10px] bg-[#208df9] text-white font-medium'
							onClick={onSubmit}
						>
							스탬프 투어 시작 !
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Input;
