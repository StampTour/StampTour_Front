import React from "react";
import Hiimg from "../../../img/Hi.png";

const Header = () => {
    return(
        <div id="header" className="pt-[30px] pb-[20px] bg-[#bfeefe] drop-shadow">
            <div className="Titlefont flex flex-col items-center text-[50px] drop-shadow-lg">
                <span className="">체험존</span>
                <span className="">스탬프 투어</span>
            </div>
            <div className="flex flex-row justify-center my-[20px] mt-[30px]">
                <img className="h-[50px] mr-[10px]" src={Hiimg} alt="" />
                <div className="Mainfont flex flex-col items-center text-[18px] text-[#FE904C]">
                    <span className="">광진구 교육체험관을 경험하고</span>
                    <span>10개의 스탬프를 모두 모아보세요 !</span>
                </div>
                <img className="h-[50px] ml-[5px]" src={Hiimg} alt="" />
            </div>
        </div>

    )
}

export default Header;