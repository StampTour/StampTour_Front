import React from "react";
import Header from "../component/Gwangjin/article/Header";
import Stampmain from "../component/Gwangjin/article/Stampmain";
import Qrscanner from "../component/Gwangjin/article/Qrscanner";

const Gwangjin = () => {
	// 리액트는 데이터가 받아왔든 말든 그냥 보여줘
	return (
		<div className='Gwangjin'>
			<Header />
			<Stampmain />
			<Qrscanner />
		</div>
	);
};

export default Gwangjin;
