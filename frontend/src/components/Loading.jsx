import "./loading.css";
import { Loader } from "react-feather";

const Loading = () => {
  return (
    <main className="dark:bg-gray-900 min-h-screen flex">
      <div className="m-auto text-center">
        <h1 className="artsume select-none transition-colors text-center text-9xl font-bold mb-5">
          Artsu.me
        </h1>
        <div className="flex items-center text-gray-300 gap-3">
          <Loader className="spinner ml-auto" />
          <p className="font-semibold mr-auto">Please wait a moment...</p>
        </div>
      </div>
    </main>
  );
};

export default Loading;
