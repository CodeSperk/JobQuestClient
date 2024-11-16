import { Link } from "react-router-dom";
import Button1 from "../../Shared/Buttons/Button1";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative text-center space-y-6 md:w-1/2">
        <img
          src="https://i.ibb.co/Jyfbwrm/Screenshot-5.png"
          alt=""
          className="rounded-xl"
        />
        <Link to="/" className="absolute bottom-4 left-1/2">
          <Button1 name="Back To Home"></Button1>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
