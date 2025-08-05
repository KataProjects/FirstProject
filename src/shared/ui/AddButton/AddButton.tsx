import { PlusOutlined } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';
import { type FC } from 'react';

interface AddButtonProps extends ButtonProps {
  text: string;
}

export const AddButton: FC<AddButtonProps> = ({ text, ...rest }) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined style={{ marginRight: '8px' }} />}
      {...rest}
    >
      {text}
    </Button>
  );
}; 