import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
	return (
		<div className='Home grid grid-cols-1 place-items-center m-[10px]'>
			<h1 className='text-[40px] text-center mb-[20px]'>
				QR 스탬프 링크
			</h1>
			<Link
				className='text-[20px] bg-[grey] p-[10px]'
				to='/Gwnagjin'
			>
				광진구 스탬프투어로 이동
			</Link>
			<Link to='/Login'>로그인</Link>
		</div>
	);
};

export default Home;
