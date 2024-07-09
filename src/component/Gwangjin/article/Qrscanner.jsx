import React, { useRef, useState, useEffect } from "react";
import QrScanner from "qr-scanner";
import CameraView from "./Cameraview"; // CameraView를 정의한 파일 경로를 맞춰서 import
import Cameraimg from "../../../img/Camera.png";

const Qrscanner = () => {
  const videoRef = useRef();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [qrScanner, setQrScanner] = useState(null);

  useEffect(() => {
    if (isCameraActive && videoRef.current) {
      console.log("Initializing QR Scanner");
      const scanner = new QrScanner(
        videoRef.current,
        (result) => handleScan(result),
        QrOptions
      );
      scanner
        .start()
        .then(() => {
          console.log("Camera started");
        })
        .catch((err) => {
          console.error("Error starting camera:", err);
        });
      setQrScanner(scanner);
    }

    return () => {
      if (qrScanner) {
        console.log("Stopping QR Scanner");
        qrScanner.stop();
      }
    };
  }, [isCameraActive, qrScanner]);

  const handleScan = (result) => {
    console.log("decoded qr code:", result);
    try {
      const parsedData = JSON.parse(result.data);
      console.log("Parsed data:", parsedData);
      //setMyRun({
      //location_id: parsedData.location_id,
      //ranking: parsedData.ranking,
      //})
    } catch (err) {
      console.error("Error parsing QR code data:", err);
    }
    setIsCameraActive(false); // QR 코드가 스캔되면 카메라 정지
  };

  const handleStartCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const handleStopCamera = () => {
    setIsCameraActive(false);
  };

  return (
    <div id="qrscanner">
      {isCameraActive ? (
        <CameraView ref={videoRef} />
      ) : (
        <button
          id="Camerabtn"
          className="fixed flex justify-center items-center bottom-[25px] right-[10px] bg-[#FE9D62] w-[70px] h-[70px] rounded-[100px]"
          onClick={handleStartCamera}
        >
          <img className="h-[30px] " src={Cameraimg} alt="" />
        </button>
      )}
      {isCameraActive && (
        <button
          id="Camerabtn"
          className="fixed flex justify-center items-center bottom-[25px] right-[10px] bg-[#FE9D62] w-[70px] h-[70px] rounded-[100px]"
          onClick={handleStopCamera}
        >
          X
        </button>
      )}
    </div>
  );
};

export const QrOptions = {
  // 핸드폰의 경우, 외부 카메라인지 셀프카메라인지
  preferredCamera: "environment",
  // 1초당 몇번의 스캔을 할 것인지? ex) 1초에 5번 QR 코드 감지한다.
  maxScansPerSecond: 5,
  // QR 스캔이 일어나는 부분을 표시해줄 지 (노란색 네모 테두리가 생긴다.)
  highlightScanRegion: true,
};

export default Qrscanner;
