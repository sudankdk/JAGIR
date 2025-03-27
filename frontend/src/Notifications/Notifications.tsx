import React, { useEffect, useState } from "react";
import { Bell, ThumbsUp, MessageSquare } from "lucide-react";

interface Notification {
  type: string;
  message: string;
  status: string;
}

function NotificationSend() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/notifications/");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
    console.log(notifications);
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="text-white w-6 h-6" />
              <h1 className="text-xl font-semibold text-white">
                Notifications
              </h1>
            </div>
            <span className="text-indigo-100 text-sm">
              {notifications.length} Updates
            </span>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-100">
            {notifications.map((notification, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full p-3 bg-green-100">
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <p className="text-gray-700 text-center mb-6">
                  {notification.message}
                </p>

                {/* Action Button */}
                <div className="space-y-3">
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4">
            <p className="text-sm text-gray-500 text-center">
              Stay updated with your application progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationSend;
