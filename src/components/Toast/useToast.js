import { useToastContext } from "./ToastProvider";

export const useToast = () => {
  const ctx = useToastContext();
  const noop = () => {};
  return ctx?.toast
    ? ctx
    : {
        toast: {
          show: noop,
          success: noop,
          error: noop,
          info: noop,
          warning: noop,
          dismiss: noop,
          clear: noop,
        },
      };
};
