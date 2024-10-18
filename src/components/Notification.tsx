import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../redux/notificationSlice";
import { RootState } from "../redux/store";
import { useEffect } from "react";

let timeout: ReturnType<typeof setTimeout>;

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (notification.message !== "") {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    }
  }, [dispatch, notification.message]);

  if (!notification.visible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${
        notification.type === "success"
          ? "bg-green-500"
          : notification.type === "error"
          ? "bg-red-500"
          : "bg-yellow-500"
      }`}
    >
      <p className="text-white">{notification.message}</p>
      <button
        className="text-white underline mt-2"
        onClick={() => dispatch(hideNotification())}
      >
        Dismiss
      </button>
    </div>
  );
};

export default Notification;
