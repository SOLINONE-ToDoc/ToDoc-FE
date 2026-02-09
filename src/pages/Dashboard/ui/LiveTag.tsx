import { ICON_LIVE } from '../assets/icons';

export const LiveTag = () => {

  return (
    <div className='flex items-center justify-center w-[116px] h-[40px] px-3 gap-2 rounded-full bg-black/50 border border-black/8 select-none'>
      <ICON_LIVE width={24} height={24} />
      <span className='text-body-2 font-regular text-content-onInverse'>실시간 뷰</span>
    </div>
  );
};
