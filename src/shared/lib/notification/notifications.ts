import { notification } from 'antd';


export const showNotification = (
  type: 'success' | 'info' | 'warning' | 'error',
  message: string,
  description?: string
) => {
  notification[type]({
    message,
    description,
    placement: 'top',
  });
};
notification.config({
  placement: 'top',
  top: 24,
});

//уведомление что успешно
export const showSuccess = (message: string, description?: string) => {
  notification.success({
    message,
    description,
  });
};

//уведомление об ошиьке
export const showError = (message: string, description?: string) => {
  notification.error({
    message,
    description,
  });
};

//информационное ув-е
export const showInfo = (message: string, description?: string) => {
  notification.info({
    message,
    description,
  });
};

//варнинг уведомление
export const showWarning = (message: string, description?: string) => {
  notification.warning({
    message,
    description,
  });
};