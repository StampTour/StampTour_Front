import Before_Robot_X from "../../../img/Before_Robot_X.svg";
import Before_Drone_X from "../../../img/Before_Drone_X.svg";
import Before_AR_X from "../../../img/Before_AR_X.svg";
import Before_VR_X from "../../../img/Before_VR_X.svg";
import Before_Car_X from "../../../img/Before_Car_X.svg";
import After_Car_O from "../../../img/After_Car_O.svg";
import After_Drone_O from "../../../img/After_Drone_O.svg";
import After_Robot_O from "../../../img/After_Robot_O.svg";
import After_VR_O from "../../../img/After_Vr_O.svg";
import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import BoothInfo from "../article/BoothInfo";
const Stampmain = () => {
	const booths = [
		{
			id: 1,
			name: "로봇 체험존",
			beforeSrc: Before_Robot_X,
			afterSrc: After_Robot_O,
		},
		{
			id: 2,
			name: "드론 체험존",
			beforeSrc: Before_Drone_X,
			afterSrc: After_Drone_O,
		},
		{
			id: 3,
			name: "AR 체험존",
			beforeSrc: Before_AR_X,
			afterSrc: After_Drone_O,
		},
		{
			id: 4,
			name: "VR 체험존",
			beforeSrc: Before_VR_X,
			afterSrc: After_VR_O,
		},
		{
			id: 5,
			name: "자율주행 체험존",
			beforeSrc: Before_Car_X,
			afterSrc: After_Car_O,
		},
	];

	const [visible, setVisible] = useState(false);
	const [selectedBoothId, setSelectedBoothId] =
		useState(null);
	const [stampedBooths, setStampedBooths] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/");
			return;
		}

		const searchParams = new URLSearchParams(
			location.search
		);
		const stampedId = searchParams.get("stampedId");

		if (stampedId) {
			const id = parseInt(stampedId, 10);
			if (!stampedBooths.includes(id)) {
				setStampedBooths((prev) => [...prev, id]);

				axios.post(
					"/api/save-stamp",
					{id},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}
		}
	}, [location, stampedBooths, navigate]);

	const handleClick = (boothId) => {
		setSelectedBoothId(boothId);
		setVisible(!visible);
	};

	const newBooth = booths.map((booth) => {
		const isStamped = stampedBooths.includes(booth.id);
		const src = isStamped
			? booth.afterSrc
			: booth.beforeSrc;

		return (
			<button
				onClick={() => handleClick(booth.id)}
				key={booth.id}
				className='relative flex flex-col items-center justify-center bg-[white] w-full h-full pt-[25px] pb-[15px]'
			>
				{visible && selectedBoothId === booth.id && (
					<BoothInfo boothid={booth.id} />
				)}
				<img className='w-[130px]' src={src} alt='' />
				<div className='Stampfont flex flex-col items-center text-[16px] mt-[10px]'>
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
