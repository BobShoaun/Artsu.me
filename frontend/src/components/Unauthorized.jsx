const Unauthorized = () => {
  return (
    <main className="dark:bg-gray-900 min-h-screen flex">
      <div className="m-auto text-center">
        <h1 className="artsume select-none transition-colors text-center text-9xl font-bold mb-5">
          Forbidden
        </h1>
        <div className="text-gray-300 gap-3">
          <p className="font-semibold text-center">This page is 403 Forbidden! Please go away.</p>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;
