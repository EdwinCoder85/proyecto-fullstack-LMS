import { SidebarRoutes } from '@/app/dashboard/components/SidebarRoutes';

export default function Sidebar() {

  return (
    <div
      className="fixed top-20 w-60 h-[calc(100vh-5.4rem)] bg-slate-100 border border-primary-600 p-4 flex flex-col justify-between transition-all">
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}
