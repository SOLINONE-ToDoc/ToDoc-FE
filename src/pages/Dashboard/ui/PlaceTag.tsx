import { ICON_LOCATION } from '../assets/icons';

interface PlaceTagProps {
  placeName: string;
}

export const PlaceTag = ({ placeName }: PlaceTagProps) => {

  return (
    <div className='flex items-center justify-center h-[40px] px-3 gap-1 rounded-full bg-black/50 border border-black/8 select-none'>
      <ICON_LOCATION width={24} height={24} className='text-white'/>
      <span className='text-body-2 font-regular text-content-onInverse'>
        {placeName}
      </span>
    </div>
  );
};
