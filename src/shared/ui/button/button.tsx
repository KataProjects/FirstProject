import { Plus } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({ children, onClick }: Props) => (
  <button
    className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-lg italic shadow-sm hover:shadow-md transition'
    onClick={onClick}
  >
    {children}
    <Plus size={20} strokeWidth={2} />
  </button>
);