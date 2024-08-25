/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from "react";
import {
	useNavigate,
	useSearchParams,
} from "react-router-dom";

// constants
import BoothInfo from "../article/BoothInfo";
import {useCookies} from "react-cookie";
import axios from "axios";

const Stampmain = () => {
	const navigation = useNavigate();
	const [cookies, setCookies, removeCookies] = useCookies([
		"stampedId",
		"token",
	]);
	const [searchParams] = useSearchParams();

	const {token} = cookies;

	// 스탬프 아이디
	const stampedId = searchParams.get("stampedId");

	const booths = [
		{
			id: 1,
			name: "로봇 체험존1",
			beforeSrc: "img/Before_Robot_X.svg",
			afterSrc: "img/After_Robot_O.svg",
		},
		{
			id: 2,
			name: "드론 체험존",
			beforeSrc: "img/Before_Drone_X.svg",
			afterSrc: "img/After_Drone_O.svg",
		},
		{
			id: 3,
			name: "AR 체험존",
			beforeSrc: "img/Before_AR_X.svg",
			afterSrc: "img/After_AR_O.svg",
		},
		{
			id: 4,
			name: "VR 체험존",
			beforeSrc: "img/Before_VR_X.svg",
			afterSrc: "img/After_Vr_O.svg",
		},
		{
			id: 5,
			name: "자율주행 체험존",
			beforeSrc: "img/Before_Car_X.svg",
			afterSrc: "img/After_Car_O.svg",
		},
		{
			id: 6,
			name: "mission",
			beforeSrc: "img/stampbasicx.png",
			afterSrc: "img/stampbasico.png",
		},
		{
			id: 7,
			name: "mission",
			beforeSrc: "img/stampbasicx.png",
			afterSrc: "img/stampbasico.png",
		},
		{
			id: 8,
			name: "mission",
			beforeSrc: "img/stampbasicx.png",
			afterSrc: "img/stampbasico.png",
		},
		{
			id: 9,
			name: "mission",
			beforeSrc: "img/stampbasicx.png",
			afterSrc: "img/stampbasico.png",
		},
		{
			id: 10,
			name: "mission",
			beforeSrc: "img/stampbasicx.png",
			afterSrc: "img/stampbasico.png",
		},
	];

	const [visible, setVisible] = useState(false);
	const [selectedBoothId, setSelectedBoothId] =
		useState(null);

	const [boolean, setBoolean] = useState(
		new Array(10).fill(false)
	);
	const [, setUserData] = useState();

	const getData = async () => {
		try {
			const res = await axios.get(
				"https://stamptour.xyz/api/userinfo",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

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

	const saveQRData = async () => {
		try {
			// alert("저장된 스탬프 아이디 확인: ", stampedId);
			const res = await axios.post(
				`https://stamptour.xyz/api/savestamp?stampedId=${
					stampedId !== null ? stampedId : cookies.stampedId
				}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// console.log("QR 저장 성공!!!!: ", res);
			if (res.status === 200) {
				getData();
				removeCookies("stampedId");
			}
		} catch (e) {
			console.log("qr save error : ", e);
		}
	};

	useEffect(() => {
		if (stampedId !== null) {
			saveQRData();
		}
	}, []);

	useEffect(() => {
		if (!token) {
			navigation("/");
			return;
		}

		getData();

		if (stampedId) {
			const id = parseInt(stampedId, 10);
			setBoolean((prevBoolean) => {
				let newArray = [...prevBoolean];
				newArray[id - 1] = true; // 인덱스는 0부터 시작하므로 id-1 사용
				return newArray;
			});

			saveQRData();
		}
	}, []);

	useEffect(() => {
		// console.log("accessToken:", accessToken);
		if (!token) {
			setCookies("stampedId", stampedId, {
				path: "/",
				sameSite: "None",
				secure: true,
				// domain: process.env.REACT_APP_COOKIE_DOMAIN,
			});
			localStorage.setItem("stampedId", stampedId);
			navigation("/");
		}
	}, [token, stampedId]);

	const handleClick = (boothId) => {
		setSelectedBoothId(boothId);
		setVisible(!visible);
	};

	useEffect(() => {
		console.log("sessionId: ", token);
	}, [token]);

	const newBooth = booths.map((booth) => {
		const isStamped = boolean[booth.id - 1]; // boolean 배열을 사용하여 상태 확인
		const src =
			isStamped === true ? booth.afterSrc : booth.beforeSrc;

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
