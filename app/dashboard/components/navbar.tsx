import { MobileSidebar } from './mobileSidebar';

export const Navbar = () => {
  return (
    <div className="px-10 py-3 border-b h-full flex items-center bg-primary-600 text-white shadow-sm">
      <MobileSidebar />
    </div>
  )
}