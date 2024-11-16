import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import useAxios from "../../../Hooks/useAxios";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { createUser, logOutUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const axiosSecure = useAxios();

  // To register with email and password
  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
  

    // to validate password
    if (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*\W)(?!.* )/.test(password)) {
      setError(
        "At least a digit an Uppercase letter & a special character is required."
      );
      return;
    }

    // to register new user
    createUser(email, password)
      .then((result) => {
        // to update name & photo url
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then()
          .catch((error) => console.log(error.code));
        
        // to store users info in the data base
        const usersInfo = {
          name,
         email,
         role: "user"
        }
        axiosSecure.post("/users", usersInfo).then((res) => {
          if (res.data.insertedId) {
            // alert
            setSuccess(true);
        //to prevent auto login
        logOutUser()
          .then()
          .catch((error) => console.log(error.code));

        //to clear form and navigate after success
        form.reset();
          }
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("Already Registered !");
        }
      });
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 90px)" }}
      className="w-full flex justify-center items-center py-12 lg:py-24"
    >
      <Helmet>
        <title>JobQuest | Register </title>
      </Helmet>
      <div className="card-style w-96 md:w-[420px] border  p-8 space-y-3 rounded-xl bg-[var(--clr-light-gray)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Register</h1>
          <small className="">Hi, You are welcome</small>
          {success ? (
            <h6 className="text-[var(--clr-focused)]">
              Registration successful, Please Login Now
            </h6>
          ) : (
            ""
          )}
        </div>

        <form onSubmit={handleRegister} className="space-y-6 text-sm">
          {/* Name field */}
          <div className="space-y-2">
            <label className="block">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>
          {/* email field */}
          <div className="space-y-2">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Your email"
              className="w-full px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>

          {/* Photo Url */}
          <div className="space-y-2">
            <label className="block">Photo</label>
            <input
              type="text"
              name="photo"
              id="photo"
              placeholder="Your photo url"
              className="w-full px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block dark:text-gray-600">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPass ? "password" : "text"}
                name="password"
                id="password"
                required
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
            {/* to show error message */}
            <p className="text-center text-red-700 text-sm">{error}</p>
          </div>

          <button className="w-full bg-[var(--clr-focused)] text-[var(--clr-light)] px-4 py-2.5 rounded-md hover:rounded-full duration-300 font-bold text-base mt-6">
            Sign up
          </button>
        </form>

        <p className="text-center text-sm flex justify-center gap-2 pt-2">
          Already Have an account?
          <Link
            to="/login"
            className="flex gap-1 text-[var(--clr-focused)] font-bold"
          >
            Please Login <FiArrowUpRight />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
