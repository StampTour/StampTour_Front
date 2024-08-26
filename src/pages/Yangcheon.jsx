import React from "react";
import Header from "../component/Gwangjin/article/Header";
import Stampmain from "../component/Gwangjin/article/Stampmain";

const Gwangjin = () => {
	// 리액트는 데이터가 받아왔든 말든 그냥 보여줘
	return (
		<div className='Gwangjin'>
			<Header />
			<Stampmain />
		</div>
	);
};

export default Gwangjin;
