import React from "react";
import Header from "../component/Gwangjin/article/Header";
import Stampmain from "../component/Gwangjin/article/Stampmain";
import Qrscanner from "../component/Gwangjin/article/Qrscanner";
import axios from "axios";

const Gwangjin = () => {
	// 화살표 함수가 되면서 const가 필요해짐
	const getData = async () => {
		try {
			// get 가져오는거

			// api 요청 보냄 > react UI 출력  > 데이터가 와 x
			// api 요청 보냐고 기다렸다가 react UI 출력 O
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/albums"
			);
			console.log("axiost success! ", response);
		} catch (e) {
			console.log(e);
		}
	};

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
