import { ICON_CIRCLE_DASHED } from '../assets/icons';

interface FontTagProps {
  FontName: string;
}

export const FontTag = ({ FontName }: FontTagProps) => {

  return (
    <div
      style={{ background: 'linear-gradient(-80deg, rgba(0, 0, 0, 0.3) 0%, rgba(63, 63, 63, 0.3) 50%, rgba(0, 0, 0, 0.3) 100%)' }}
      className='flex items-center justify-center h-[40px] px-3 py-2 gap-2 rounded-full select-none shadow-lg'
    >
      <ICON_CIRCLE_DASHED width={24} height={24} />
      <span className='text-body-2 font-regular text-content-onInverse'>
        {FontName} 적용 중
      </span>
    </div>
  );
};
