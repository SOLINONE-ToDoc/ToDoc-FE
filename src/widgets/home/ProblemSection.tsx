import { IMAGES } from '@/shared/constants/images';

export const ProblemSection = () => {

  return (
    <section className="bg-gray-600 flex flex-col items-center py-[80px] px-[154px]">
      <div className="w-full flex flex-col items-center gap-4 lg:gap-10 text-center">
        <div className="w-full flex flex-col lg:flex-row lg:gap-[100px] items-center justify-center">
          <div className="flex flex-col gap-3">
            <span className="text-[18px] font-semibold text-white text-left">
              손님의 빈자리도 다시 보는 토독
            </span>
            <span className="text-[40px] text-left lg:text-hero-2 font-bold leading-tight sm:leading-[1.05] whitespace-pre-line text-white">
              손님은 다녀가지만, <br />
              <span className='text-red-400'>매장</span>은 기록되지 않습니다.
            </span>
            <span className="text-[22px] font-regular text-white text-left">
            </span>
          </div>
          <IMAGES.KeyCaps />
        </div>
        <div className="w-full flex flex-row gap-7 items-center justify-center">
          <div className='flex flex-col p-7 bg-white border-[2px] border-red-300 rounded-[20px] w-[356px]'>
            <span className="text-[24px] font-semibold text-left pb-2">
              01 흩어진 기록
            </span>
            <span className="text-[16px] text-left font-semibold pb-8">
              손님 기록이 한 곳에 모이지 않습니다
            </span>
            <span className="text-[16px] font-regular text-gray-400 text-left">
              손님 메시지는 리뷰, SNS, DM에 흩어져 <br />
              매장에는 아무것도 남지 않습니다
            </span>
          </div>
          <div className='flex flex-col p-7 bg-white border-[2px] border-red-300 rounded-[20px] w-[356px]'>
            <span className="text-[24px] font-semibold text-left pb-2">
              02 쌓이지 않는 경험
            </span>
            <span className="text-[16px] text-left font-semibold pb-8">
              좋은 경험이 재방문으로 이어지지 않습니다
            </span>
            <span className="text-[16px] font-regular text-gray-400 text-left">
              어제 남긴 기록이<br />
              오늘 다시 사용되지 않습니다
            </span>
          </div>
          <div className='flex flex-col p-7 bg-white border-[2px] border-red-300 rounded-[20px] w-[356px]'>
            <span className="text-[24px] font-semibold text-left pb-2">
              03 활용되지 못한 추억
            </span>
            <span className="text-[16px] text-left font-semibold pb-8">
              기록이 운영에 쓰이지 않습니다
            </span>
            <span className="text-[16px] font-regular text-gray-400 text-left">
              손님 사진과 메시지가 있어도<br />
              마케팅이나 운영에 활용되지 않습니다
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
