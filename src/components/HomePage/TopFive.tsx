import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/swiper.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";

import { topfiveData } from "../../utils/data/topfiveData";

const TopFive = () => {
  const nav = useNavigate();
  const [index, setIndex] = useState(0);
  return (
    <div className="relative w-full h-[550px] mobile:h-auto bg-darkBlue bg-gradient-to-b from-transparent to-mainBlue/50">
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 95000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={(currentIndex: any) => setIndex(currentIndex.snapIndex)}
        className="h-[550px] mobile:h-auto"
      >
        {topfiveData.map(item => (
          <SwiperSlide key={item.id}>
            <div className="w-[79%] mobile:w-full relative mobile:px-[80px] flex gap-[45px] mobile:flex-col mobile:items-center mobile:mt-[120px] mobile:gap-[20px]">
              <div className="flex flex-col relative">
                <div className="w-[200px] h-[266px] overflow-hidden mobile:w-[300px] mobile:h-[400px]">
                  <img
                    src={item.thumbnailImage}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[60px] h-[60px] top-[-12px] right-[-16px] absolute rounded-full flex justify-center items-center bg-mainBlue font-bold text-[20px] text-white">
                  인기
                </div>
                <div
                  className="w-[200px] mobile:w-[300px] h-[44px] rounded-[8px] mt-[10px] flex justify-center items-center bg-mainBlue text-white font-bold text-p cursor-pointer"
                  onClick={() => nav(`/detail/${item.id}`)}
                >
                  참가 신청하기
                </div>
              </div>
              <div className="h-[320px] flex flex-col justify-between mobile:h-auto">
                <div className="flex flex-col">
                  <div className="font-bold text-lgTitle text-white leading-tight line-clamp-2 mt-[20px]">
                    {item.title}
                  </div>
                  <div className="font-regular text-mdTitle text-white mt-[16px]">
                    {item.category}
                  </div>
                  <div className="font-regular text-p text-white mt-[16px] line-clamp-4">
                    {item.description}
                  </div>
                </div>
                <div className="flex mobile:flex-col items-center mobile:items-start mobile:pt-[50px] mobile:pb-[30px] font-regular text-smTitle text-white">
                  <div>신청 마감까지</div>
                  <div className="font-bold text-[24px] ml-[7px] mobile:ml-0">{`D-${item.remainingDays}`}</div>
                </div>
              </div>
              <div className="absolute bottom-[-70px] right-[-20px] mobile:bottom-[20px] mobile:right-[80px] flex flex-col items-end gap-[10px]">
                <div className="w-[70px] h-[70px]">
                  <ProgressProvider
                    endRate={item.goal.progressRate}
                    index={index}
                  >
                    {(value: number) => (
                      <CircularProgressbar
                        value={value}
                        text={`${item.goal.progressRate}%`}
                        strokeWidth={12}
                        counterClockwise={true}
                        styles={buildStyles({
                          pathTransitionDuration: 2,
                          strokeLinecap: "rounded",
                          trailColor: "rgba(24, 90, 219, 0.4)",
                          pathColor: "#185ADB",
                          textColor: "#CEDAF3",
                          textSize: "30px",
                        })}
                      />
                    )}
                  </ProgressProvider>
                </div>
                <div className="font-regular text-sm text-white">{`${item.goal.targetNumber}명 중 ${item.goal.registrantNumber}명 신청`}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute w-full top-[50px] font-bold text-white text-mdTitle text-center">
        인기 행사 TOP5
      </div>
    </div>
  );
};

export default TopFive;
