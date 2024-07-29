/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from "react";
import {
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import axios from "axios";

// img
import Before_Robot_X from "../../../img/Before_Robot_X.svg";
import Before_Drone_X from "../../../img/Before_Drone_X.svg";
import Before_AR_X from "../../../img/Before_AR_X.svg";
import Before_VR_X from "../../../img/Before_VR_X.svg";
import Before_Car_X from "../../../img/Before_Car_X.svg";
import After_Car_O from "../../../img/After_Car_O.svg";
import After_Drone_O from "../../../img/After_Drone_O.svg";
import After_Robot_O from "../../../img/After_Robot_O.svg";
import After_VR_O from "../../../img/After_Vr_O.svg";

// constants
import BoothInfo from "../article/BoothInfo";

// apis
import {getUserInfo} from "../../../apis/main";

const Stampmain = () => {
	const [searchParams] = useSearchParams();
	const stampedId = searchParams.get("stampedId");
	const token = localStorage.getItem("token");
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

	const [boolean, setBoolean] = useState(
		new Array(10).fill(false)
	);
	const [userData, setUserData] = useState();

	const [stampedBooths, setStampedBooths] = useState([]);
	const navigate = useNavigate();

	const getData = async () => {
		try {
			const res = await getUserInfo();
			console.log("유저 데이터 가져오기 성공: ", res.data);

			if (res.status === 200) {
				setUserData(res.data);
				const qrArray = new Array(10).fill(false);

				// qr 값 탐색 후 배열에 저장
				Object.keys(res.data).forEach((key) => {
					if (
						key.startsWith("qr") &&
						res.data[key] === true
					) {
						const index =
							parseInt(key.replace("qr", "")) - 1; // qr1 -> index 0
						if (
							!isNaN(index) &&
							index >= 0 &&
							index < qrArray.length
						) {
							qrArray[index] = true;
						}
					}
				});

				setBoolean(qrArray);
			}
		} catch (e) {
			console.log("get data error : ", e);
		}
	};

	const saveQRData = async (id) => {
		const token = localStorage.getItem("token");
		try {
			const res = await axios.post(
				"https://stamptour.xyz/api/save-stamp",
				{id},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("QR 저장 성공!!!!: ", res.data);
		} catch (e) {
			console.log("qr save error : ", e);
		}
	};

	useEffect(() => {
		if (!token) {
			navigate("/");
			return;
		}

		getData();

		if (stampedId) {
			const id = parseInt(stampedId, 10);
			if (!stampedBooths.includes(id)) {
				setStampedBooths((prev) => [...prev, id]);

				setBoolean((prevBoolean) => {
					let newArray = [...prevBoolean];
					newArray[id - 1] = true; // 인덱스는 0부터 시작하므로 id-1 사용
					return newArray;
				});

				saveQRData(stampedId);
			}
		}
	}, []);

	const handleClick = (boothId) => {
		setSelectedBoothId(boothId);
		setVisible(!visible);
	};

	useEffect(() => {
		console.log("boolean: ", boolean);
		console.log("userData: ", userData);
		console.log("stampedBooths: ", stampedBooths);
	}, [boolean, userData]);

	const newBooth = booths.map((booth) => {
		const isStamped = boolean[booth.id - 1]; // boolean 배열을 사용하여 상태 확인
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
