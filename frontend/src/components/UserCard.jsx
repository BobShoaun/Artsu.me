import { Link } from "react-router-dom";
import { defaultAvatarUrl } from "../config";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/portfolio/${user.username}`}
      key={user._id}
      className={`mx-auto ${
        user.isFeatured
          ? "bg-gradient-to-br hover:from-rose-500 hover:to-teal-500 "
          : "hover:bg-gray-800"
      }  rounded-lg transition-all p-4 cursor-pointer hover:-translate-y-2 hover:shadow-xl shadow-lg transform`}
    >
      {user.isFeatured && (
        <h3 className="underline-offset text-white text-sm font-semibold underline mb-2">
          Featured
        </h3>
      )}
      <div className="mb-2">
        <img
          className="main-page-avatar shadow-lg rounded-sm w-48 h-48 object-cover"
          src={user.avatarUrl || defaultAvatarUrl}
          onError={e => (e.target.src = defaultAvatarUrl)}
          alt={`${user.name} avatar`}
        />
      </div>
      <div className="px-2 text-center">
        <h2 className="dark:text-white font-semibold text-lg">{user.name}</h2>
        <p className="dark:text-gray-200 text-sm">{user.username}</p>
      </div>
    </Link>
  );
};

export default UserCard;
