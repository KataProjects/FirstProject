import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { type FC } from 'react';

interface AddButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export const AddButton: FC<AddButtonProps> = ({ text, onClick, className }) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined style={{ marginRight: '8px' }} />}
      onClick={onClick}
      className={className}
    >
      {text}
    </Button>
  );
}; 