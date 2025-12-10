import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4 text-center">
    
      <h1 className="text-9xl font-extrabold text-primary animate-pulse">
        404
      </h1>

      
      <h2 className="text-3xl font-bold mt-4">Oops! Page Not Found</h2>

     
      <p className="text-gray-500 mt-2 max-w-md">
        Looks like you took a wrong turn. Don’t worry, it happens! Click the
        button below to go back to the home page of AssetVerse.
      </p>

    
      <button
        onClick={handleGoHome}
        className="mt-6 btn btn-primary btn-wide hover:btn-secondary transition-all"
      >
        Go to Home
      </button>

   
      <div className="mt-10 text-gray-300 text-9xl select-none">💼</div>
    </div>
  );
};

export default NotFound;
