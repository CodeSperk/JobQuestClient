import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxios from "../../../Hooks/useAxios";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { emailPasswordLogin, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    emailPasswordLogin(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          iconColor: "#7C3AED",
          confirmButtonColor: "#7C3AED",
          title: "Login Successful",
          timer: 2500,
        });

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setError("Provide valid email & password");
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        role:"user"
      }
      axiosSecure.post("/users", userInfo)
      .then(res => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          iconColor: "#7C3AED",
          confirmButtonColor: "#7C3AED",
          title: "Login Successful",
          timer: 2500,
        });
        navigate(location?.state ? location.state : "/");
      });
    })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 90px)" }}
      className="w-full flex justify-center items-center py-12 lg:py-24"
    >
      <Helmet>
        <title>JobQuest | Login </title>
      </Helmet>
      <div className="card-style w-96 md:w-[420px] p-8 space-y-3 rounded-xl">
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
          <small className="">Hi, Welcome back</small>

          {/* Google Login field */}
          <div
            className="w-full px-4 py-2 rounded-md hover:rounded-full border-2 border-[var(--clr-focused)] flex items-center justify-center gap-2 cursor-pointer duration-300 font-bold my-6"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="text-2xl" /> <span>Login with google</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] bg-[var(--clr-focused)] w-1/12 md:w-1/4"></div>
          <p>or Login with</p>
          <div className="h-[1px] bg-[var(--clr-focused)] w-1/12 md:w-1/4"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 text-sm">
          {/* email field */}
          <div className="space-y-2">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              className="w-full px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>
          {/* Password field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPass ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Your password"
                className="w-full px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-2 text-lg cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>
          {/* to show error message */}
          <p className="text-center text-red-700 text-sm">{error}</p>

          <button className="w-full bg-[var(--clr-focused)] text-[var(--clr-light)] px-4 py-2.5 rounded-md hover:rounded-full duration-300 font-bold text-base mt-6">
            Sign in
          </button>
        </form>

        <p className="text-center text-sm flex justify-center gap-2 pt-2">
          Not registered yet?
          <Link
            to="/register"
            className="flex gap-1 text-[var(--clr-focused)] font-bold"
          >
            Create an account <FiArrowUpRight />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
