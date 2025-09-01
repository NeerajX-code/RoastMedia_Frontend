import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import "./Toast.css";

const ToastContext = createContext({
  toast: {
    show: () => {},
    success: () => {},
    error: () => {},
    info: () => {},
    warning: () => {},
    dismiss: () => {},
    clear: () => {},
  },
});

export const ToastProvider = ({ children, defaultPosition = "top-right", defaultDuration = 3000 }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (opts = {}) => {
      const id = opts.id || `${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const duration = opts.duration ?? defaultDuration;
      const position = opts.position || defaultPosition;
      const toast = {
        id,
        type: opts.type || "info", // success | error | warning | info
        title: opts.title || "",
        message: typeof opts.message === "string" ? opts.message : opts.description || "",
        position,
        duration,
        icon: opts.icon,
        style: opts.style || {},
        closable: opts.closable !== false,
      };
      setToasts((prev) => [...prev, toast]);
      if (duration > 0) {
        const timeout = setTimeout(() => removeToast(id), duration);
        timers.current.set(id, timeout);
      }
      return id;
    },
    [defaultDuration, defaultPosition, removeToast]
  );

  useEffect(() => {
    return () => {
      // cleanup timers on unmount
      timers.current.forEach((tm) => clearTimeout(tm));
      timers.current.clear();
    };
  }, []);

  const api = useMemo(() => {
    const show = (opts) => addToast(opts);
    const make = (type) => (message, opts = {}) =>
      addToast({
        ...opts,
        type,
        message,
        title:
          opts.title ??
          (
            {
              success: "Success",
              error: "Error",
              info: "Info",
              warning: "Warning",
            }[type]
          ),
      });
    return {
      show,
      success: make("success"),
      error: make("error"),
      info: make("info"),
      warning: make("warning"),
      dismiss: removeToast,
      clear: () => setToasts([]),
    };
  }, [addToast, removeToast]);

  const grouped = useMemo(() => {
    return toasts.reduce((acc, t) => {
      acc[t.position] = acc[t.position] || [];
      acc[t.position].push(t);
      return acc;
    }, {});
  }, [toasts]);

  const TypeIcon = ({ type }) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={18} />;
      case "error":
        return <AlertCircle size={18} />;
      case "warning":
        return <AlertTriangle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  return (
    <ToastContext.Provider value={{ toast: api }}>
      {children}

      {Object.entries(grouped).map(([position, list]) => (
        <div key={position} className={`toast-container ${position}`}>
          {list.map((t) => (
            <div
              key={t.id}
              className={`toast ${t.type}`}
              role="status"
              style={t.style}
              onMouseEnter={() => {
                const tm = timers.current.get(t.id);
                if (tm) clearTimeout(tm);
              }}
              onMouseLeave={() => {
                if (t.duration > 0) {
                  const tm = setTimeout(() => removeToast(t.id), t.duration);
                  timers.current.set(t.id, tm);
                }
              }}
            >
              <div className="toast__icon">{t.icon ?? <TypeIcon type={t.type} />}</div>
              <div className="toast__content">
                {t.title ? <div className="toast__title">{t.title}</div> : null}
                {t.message ? <div className="toast__message">{t.message}</div> : null}
              </div>
              {t.closable && (
                <button className="toast__close" onClick={() => removeToast(t.id)} aria-label="Close">
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
