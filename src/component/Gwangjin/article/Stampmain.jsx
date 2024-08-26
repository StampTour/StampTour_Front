/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from "react";
import {
	useNavigate,
	useSearchParams,
} from "react-router-dom";

import {useCookies} from "react-cookie";
import axios from "axios";

// constants
import BoothInfo from "../article/BoothInfo";
import {booths} from "../../../constants/boothData";

const Stampmain = () => {
	const navigation = useNavigate();
	const [cookies, setCookies, removeCookies] = useCookies([
		"token",
		"stampedId",
	]);
	const {token} = cookies;
	const [searchParams] = useSearchParams();
	const stampedId = searchParams.get("stampedId");

	const [visible, setVisible] = useState(false);
	const [selectedBoothId, setSelectedBoothId] =
		useState(null);

	const [boolean, setBoolean] = useState(
		new Array(5).fill(false)
	);

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
				const qrArray = new Array(5).fill(false);

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
			console.log("stampedId:", stampedId);
			console.log("cookies.stampedId:", cookies.stampedId);
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
			console.log("QR 저장 성공!!!!: ", res);
			if (res.status === 200) {
				getData();
				removeCookies("stampedId");
			}
		} catch (e) {
			console.log("qr save error : ", e);
		}
	};

	useEffect(() => {
		if (
			token &&
			cookies.stampedId !== undefined &&
			cookies.stampedId !== null
		) {
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
			const id = parseInt(stampedId, 5);
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
			});
			navigation("/");
		}
	}, [token, stampedId]);

	const handleClick = (boothId) => {
		setSelectedBoothId(boothId);
		setVisible(!visible);
	};

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
