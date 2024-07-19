import React from "react";

export default function BoothInfo({boothid}) {
	const boothinfos = [
		{
			id: 1,
			name: "로봇 체험존",
			description: "로봇 체험존에 대한 설명입니다.",
		},
		{
			id: 2,
			name: "드론 체험존",
			description: "드론 체험존에 대한 설명입니다.",
		},
		{
			id: 3,
			name: "AR 체험존",
			description: "AR 체험존에 대한 설명입니다.",
		},
		{
			id: 4,
			name: "VR 체험존",
			description: "VR 체험존에 대한 설명입니다.",
		},
		{
			id: 5,
			name: "자율주행 체험존",
			description: "자율주행 체험존에 대한 설명입니다.",
		},
		{
			id: 6,
			name: "자율주행 체험존",
			description: "자율주행 체험존에 대한 설명입니다.",
		},
		{
			id: 7,
			name: "자율주행 체험존",
			description: "자율주행 체험존에 대한 설명입니다.",
		},
		{
			id: 8,
			name: "자율주행 체험존",
			description: "자율주행 체험존에 대한 설명입니다.",
		},
		{
			id: 9,
			name: "자율주행 체험존",
			description: "자율주행 체험존에 대한 설명입니다.",
		},
		{
			id: 10,
			name: "자율주행 체험존",
			description: "자율주행 체험존에 대한 설명입니다.",
		},
	];

	const boothInfo = boothinfos.find(
		(info) => info.id === boothid
	);

	return (
		<div className='absolute flex flex-col items-center w-[150px] bg-[#fefbf0] rounded-[10px]  border-[2px] border-[#fe904c] py-[10px] drop-shadow-md'>
			<div className=' text-[16px] text-[#FE8134] mb-[3px]'>
				{boothInfo?.name}
			</div>
			<div className='Stampfont text-[14px] px-[7px]'>
				{boothInfo?.description}
			</div>
		</div>
	);
}
