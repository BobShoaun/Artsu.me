import "./index.css";

const LoginPage = () => {
  return (
    <main className="bg-gradient-to-br from-rose-300 to-teal-500 min-h-screen flex relative overflow-hidden">
      <h1
        style={{ fontSize: "13rem" }}
        className="text-white text-9xl -blurry-text font-bold opacity-40 absolute top-52 inset-0 z-0 text-center"
      >
        artsu.me
      </h1>

      <div className="backdrop-filter appear backdrop-blur-sm absolute inset-0"></div>

      <section className="m-auto z-10 fade-up  bg-gray-800 bg-opacity-70 -backdrop-filter -backdrop-blur-sm p-14 shadow-2xl rounded-lg max-w-xl">
        <h1
          to="/"
          className="dark:text-white text-5xl font-semibold text-center mb-14"
        >
          artsu.me
        </h1>
        <form className="">
          <label className="dark:text-gray-200 text-sm text-right mb-2">
            Username:
          </label>
          <input className="px-2 py-1 mb-8" type="text" />
          <label className="dark:text-gray-200 text-sm text-right mb-3">
            Password:
          </label>
          <input className="px-2 py-1 mb-8" type="password" />
          <button className="text-white py-3 rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-500 to-teal-500 block w-full">
            LOGIN
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
