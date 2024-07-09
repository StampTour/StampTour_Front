import React, {useState} from "react";
import Cameraimg from "../../../img/Camera.png";
import Robotimg from "../../../img/robot.png";

const Stampmain = () => {
	const booths = [
		{
			id: 1,
			name: "로봇",
			boothimg: "../../../img/robot.png",
		},
		{
			id: 2,
			name: "테스트",
			boothimg: "{Robotimg}",
		},
		{
			id: 3,
			name: "로봇",
			boothimg: "{Robotimg}",
		},
		{
			id: 4,
			name: "로봇",
			boothimg: "{Robotimg}",
		},
		{
			id: 5,
			name: "로봇",
			boothimg: "{Robotimg}",
		},
		{
			id: 6,
			name: "로봇",
			boothimg: "{Robotimg}",
		},
		{
			id: 7,
			name: "로봇",
			boothimg: "{Robotimg}",
		},
		{
			id: 8,
			name: "로봇",
			boothimg: "{Robotimg}",
		},
		{
			id: 9,
			name: "로봇",
			boothimg: "{Robotimg}",
		},
		{
			id: 10,
			name: "로봇",
			boothimg: "{Robotimg}",
		},
	];

	const newBooth = booths.map((booth) => {
		return (
			<button
				id={booth.id}
				className='flex flex-col items-center justify-center bg-[white] w-full h-full'
			>
				<img
					className='h-[50px]'
					src={booth.boothimg}
					alt=''
				/>
				<div className='Stampfont flex flex-col items-center text-[15px] mt-[20px]'>
					<span className=''>{booth.name}</span>
					<span>체험존</span>
				</div>
			</button>
		);
	});

	return (
		<div id='stampmain' className='relative'>
			<div className='grid grid-cols-2 gap-x-0.5 gap-y-0.5 place-content-between mx-[20px] my-[40px] bg-[#F2F2F2] Mainfont text-[20px]'>
				{newBooth}
			</div>
		</div>
	);
};

export default Stampmain;
