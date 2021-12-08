import { Check } from "react-feather"; // removed Search, Bell
import { Link } from "react-router-dom";
import { defaultAvatarUrl } from "../config";
import { formatRelative } from "date-fns";

const MessagePanel = ({ messages, onReadMessage }) => {
  return (
    <div className="notifications cursor-auto bg-gray-900 p-1 w-96 left-0 absolute border-2 border-gray-900 top-10 rounded-md">
      <h2 className="text-gray-100 text-sm font-medium p-2">Messages:</h2>
      {messages.length > 0 ? (
        <main className="max-h-96 overflow-auto">
          {messages.map(message => (
            <div key={message._id} className="bg-gray-800 p-3 flex items-center gap-1 m-2">
              <div>
                <Link
                  className="flex items-center gap-3 mb-3"
                  to={`/portfolio/${message.sender.username}`}
                >
                  <img
                    className="rounded-full w-8 h-8 object-cover"
                    src={message.sender.avatarUrl || defaultAvatarUrl}
                    onError={e => (e.target.src = defaultAvatarUrl)}
                    alt={message.sender.name}
                  />
                  <div>
                    <p className="text-gray-100 font-semibold text-sm">{message.sender.name}</p>
                    <p className="text-gray-300 text-xs">
                      {formatRelative(new Date(message.createdAt), new Date())}
                    </p>
                  </div>
                </Link>
                <h3 className="text-white font-medium mb-0.5">{message.subject}</h3>
                <p className="text-gray-200 text-sm font-light">{message.body}</p>
              </div>
              <button
                onClick={() => onReadMessage(message._id)}
                title="Mark as read"
                className="ml-auto bg-gray-900 hover:bg-gray-700 rounded-full p-1.5"
              >
                <Check className="text-white" size={12} />
              </button>
            </div>
          ))}
        </main>
      ) : (
        <main>
          <h2 className="text-gray-100 text-center text-sm p-3 bg-gray-800">
            You have no messages.
          </h2>
        </main>
      )}
    </div>
  );
};

export default MessagePanel;
