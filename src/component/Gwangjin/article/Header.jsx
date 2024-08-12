import React from "react";

const Header = () => {
	return (
		<div
			id='header'
			className='pt-[30px] pb-[20px] bg-[#bfeefe] drop-shadow'
		>
			<div className='Titlefont flex flex-col items-center text-[45px] drop-shadow-lg'>
				<span className=''>체험존</span>
				<span className=''>스탬프 투어</span>
			</div>
			<div className='flex flex-row justify-center my-[20px]'>
				<img
					className='h-[50px] mr-[10px]'
					src='img/Hi.png'
					alt=''
				/>
				<div className='Stampfont flex flex-col items-center text-[15px] text-[black]'>
					<span className=''>
						광진구 교육체험관을 경험하고
					</span>
					<span>10개의 스탬프를 모두 모아보세요 !</span>
				</div>
				<img
					className='h-[50px] ml-[5px]'
					src='img/Hi.png'
					alt=''
				/>
			</div>
		</div>
	);
};

export default Header;
