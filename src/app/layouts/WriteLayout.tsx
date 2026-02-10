import { Outlet, useNavigate } from 'react-router-dom';
import { ICONS } from '@/shared/constants';

export const WriteLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-50 flex items-center justify-between h-[56px] px-5 py-3">
        <button
          onClick={() => navigate(-1)}
        >
          <ICONS.Back width={24} height={24}/>
        </button>

        <h1 className="text-heding-1 font-medium">작성하기</h1>

        <div className="w-6" />
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
