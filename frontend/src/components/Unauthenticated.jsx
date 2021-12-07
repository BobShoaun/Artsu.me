const Unauthenticated = () => {
  return (
    <main className="dark:bg-gray-900 min-h-screen flex">
      <div className="m-auto text-center">
        <h1 className="artsume select-none transition-colors text-center text-9xl font-bold mb-5">
          Artsu.me
        </h1>
        <div className="text-gray-300 gap-3">
          <p className="font-semibold text-center">You are not logged in, redirecting...</p>
        </div>
      </div>
    </main>
  );
};

export default Unauthenticated;
