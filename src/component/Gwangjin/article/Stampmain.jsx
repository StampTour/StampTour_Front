import Cameraimg from "../../../img/Camera.png";
import Robotimg from "../../../img/robot.png";

const Stampmain = () => {
	const booths = [
		{
			id: 1,
			name: "로봇 체험존",
			src: Robotimg,
		},
		{
			id: 2,
			name: "드론 체험존",
			src: Cameraimg,
		},
		{
			id: 3,
			name: "AR 체험존",
			src: Robotimg,
		},
		{
			id: 4,
			name: "VR 체험존",
			src: "{Robotimg}",
		},
		{
			id: 5,
			name: "XR",
			src: "{Robotimg}",
		},
		{
			id: 6,
			name: "로봇",
			src: "{Robotimg}",
		},
		{
			id: 7,
			name: "로봇",
			src: "{Robotimg}",
		},
		{
			id: 8,
			name: "로봇",
			src: "{Robotimg}",
		},
		{
			id: 9,
			name: "로봇",
			src: "{Robotimg}",
		},
		{
			id: 10,
			name: "로봇",
			src: "{Robotimg}",
		},
	];

	const newBooth = booths.map((booth) => {
		return (
			<button
				key={booth.id}
				className='flex flex-col items-center justify-center bg-[white] w-full h-full pt-[25px] pb-[15px]'
			>
				<img className='h-[50px]' src={booth.src} alt='' />
				<div className='Stampfont flex flex-col items-center text-[15px] mt-[10px]'>
					<span className=''>{booth.name}</span>
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
