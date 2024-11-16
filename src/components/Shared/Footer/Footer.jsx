import { FaFacebookF, FaInstagramSquare, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="">
      {/* Newsletter */}
      <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-6 py-12 border-b">
        <div className="lg:w-1/2 space-y-4">
          <div className="w-36 h-auto mx-auto md:mx-0 ">
            <img src={logo} alt="" />
          </div>
          <p className="max-w-[420px] text-[var(--clr-light-secondary)]">
            Subscribe to Our Newsletter and Get the Latest Job Opportunities Sent
            Directly to Your Inbox Every Week!
          </p>
        </div>
        <div className="relative w-[300px] lg:w-1/2">
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className="w-full py-4 rounded-full px-8 outline-none border-2 border-[var(--clr-focused)] text-[var(--clr-dark)]"
          />
          <button className="absolute bg-[var(--clr-focused)] text-[var(--txt-white)] py-2 rounded-full px-4 right-2 top-1/2 -translate-y-1/2 hover:scale-90 duration-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* main */}
      <div className="py-12 flex gap-6 flex-col md:flex-row justify-between">
        {/* Contact */}
        <div className="space-y-4">
          <h5>Contact Us</h5>
          <div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="py-2 px-2 rounded border-2 border-[var(--clr-accent)] outline-none text-black w-full "
            />
            <input
              type="email"
              placeholder="Your email"
              className="py-2 px-2 rounded border-2 border-[var(--clr-accent)] outline-none text-black w-full "
            />
         
          </div>

          
            <textarea
              name=""
              id=""
              rows="3"
              placeholder="Write your query here ..."
              className="w-full mt-4 rounded shadow-inner shadow-[var(--clr-accent)] text-black p-3 outline-none "
            ></textarea>
       
            <input
              type="submit"
              className="w-full space-y-4 bg-[var(--clr-focused)] text-[var(--clr-white)] py-1 px-4 rounded cursor-pointer"
            />
          
          </div>
        </div>

                {/* Address */}
                <div className="space-y-4 flex flex-col">
          <h5>Office Address</h5>
          <p className="text-[var(--clr-light-secondary)]">
            Level-2, 53/6, Job Quest Center, Banani, Dhaka. <br />
            (Available : Sun -
            Thu, 10:00 AM to 7:00 PM)
          </p>
          <div className="flex gap-6 flex-grow">
            <a href="#">
              {" "}
              <FaFacebookF className="icon text-xl hover:scale-150 transition-all duration-3000" />{" "}
            </a>
            <a href="#">
              <FaInstagramSquare className="icon text-xl  hover:scale-150 transition-all duration-300" />
            </a>
            <a href="#">
              <FaYoutube className="icon text-xl  hover:scale-150 transition-all duration-3000" />
            </a>
            <a href="#">
              <FaLinkedinIn className="icon text-xl  hover:scale-150 transition-all duration-3000" />
            </a>
            <a href="#">
              <FaTwitter className="icon text-xl  hover:scale-150 transition-all duration-3000" />
            </a>
          </div>
          <p className="text-[var(--clr-light-primary)] pt-6 text-center md:text-start">© {year} JobQuest All rights reserved.</p>
        </div>
        </div>
       </div>
  );
};

export default Footer;
