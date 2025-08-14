import { useCallback, useState } from 'react';

type ContextData<T> = {
  x: number;
  y: number;
  data: T;
} | null;

export const useContextMenu = <T>() => {
  const [contextData, setContextData] = useState<ContextData<T>>(null);

  const open = useCallback((event: React.MouseEvent, data: T) => {
    event.preventDefault();
    setContextData({
      x: event.clientX,
      y: event.clientY,
      data,
    });
  }, []);

  const close = useCallback(() => {
    setContextData(null);
  }, []);

  return {
    contextData,
    open,
    close,
  };
};
