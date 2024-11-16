import { Helmet } from "react-helmet-async";

const Blog = () => {
  return (
    <div>
      <Helmet>
        <title>JobQuest | Blogs </title>
      </Helmet>
      {/* Banner/ Title */}
      <div className="card-style px-4 md:px-10 lg:pl-20 rounded-xl py-16 flex justify-center items-center">
        <div className="text-center">
          <h1 className="mb-4">
            <span className="text-[var(--clr-focused)]">
              Unlocking Web Development Insights
            </span>
          </h1>
        </div>
      </div>

      {/* Blogs */}
      <section className="space-y-10 max-w-5xl mx-auto">
        {/* Blog-1 Access & Refresh Token*/}
        <div className="border-2 px-4 md:px-8 lg:px-12 rounded-lg py-10">
          <p className="font-bold text-2xl mb-8">
            What is an access token and refresh token? How do they work and
            where should we store them on the client side?
          </p>
          {/* Access Token */}
          <p className="text-xl font font-medium">Access Token : </p>
          <p>
            An access token is a short-lived credential used to authenticate and
            authorize requests to protected resources in web and mobile
            applications. Upon user login, the authentication server issues an
            access token, which the client includes in subsequent requests to
            access protected resources.
          </p>
          {/* Refresh Token */}
          <p className="text-xl mt-4 font font-medium mb-4">Refresh Token :</p>
          <p>
            A refresh token is a long-lived credential used to obtain new access
            tokens without requiring the user to re-authenticate. When an access
            token expires, the client can send the refresh token to the
            authentication server to request a new access token.
          </p>

          <p className="text-xl mt-4 font font-medium mb-">
            How do they work ?{" "}
          </p>
          <p>
            When a user logs in with their credentials, the authentication
            server verifies them and issues both an access token and a refresh
            token. The client uses the access token in the headers of requests
            to access protected resources, and the server validates the token
            before processing the request. When an access token expires, the
            client uses the refresh token to request a new access token from the
            authentication server. The server validates the refresh token and,
            if valid, issues a new access token, allowing continued access to
            protected resources without requiring the user to log in again.
          </p>

          <p className="text-xl mt-4 font font-medium mb-2">
            Where should we store them on the client side?
          </p>
          <p>
            There are three storage in the client side to store access
            token.Memory(RAM), Local Storage / Session Storage &
            Http-only-Cookie;
          </p>

          <p>
            Among these three store we should different cookie has different
            advantage. To Store the refresh token in an HTTP-only cookie is the
            most secure option. HTTP-only cookies are not accessible via
            JavaScript, reducing the risk of XSS attacks.{" "}
          </p>
        </div>

        {/* Blog-2 Express.js & Next.js */}
        <div className="border-2 px-4 md:px-8 lg:px-12 rounded-lg py-10">
          <p className="font-bold text-2xl mb-8">
          What is express js? What is Nest JS (google it)?
          </p>
          {/* Express Token */}
          <p className="text-xl font font-medium">What is express js? </p>
          <p>
            
Express.js is a popular Node.js framework for building web and mobile applications with ease and efficiency.
          </p>
          {/* Refresh Token */}
          <p className="text-xl mt-4 font font-medium mb-4">What is express js?</p>
          <p>
            Next.js is a React framework enabling server-side rendering, with
            features like code splitting, routing, and static site generation.
            It's popular for fast, scalable web apps.
          </p>

          <p className="text-xl mt-4 font font-medium mb-2">
          What is Nest JS ?{" "}
          </p>
          <p>
          Next.js is a React framework enabling server-side rendering, with features like code splitting, routing, and static site generation. It's popular for fast, scalable web apps.
          </p>

          <p className="text-xl mt-4 font font-medium mb-2">
            Where should we store them on the client side?
          </p>
          <p>
            There are three storage in the client side to store access
            token.Memory(RAM), Local Storage / Session Storage &
            Http-only-Cookie;
          </p>
        </div>

        {/* Blog-3 Code Explanation */}
        <div className="border-2 px-4 md:px-8 lg:px-12 rounded-lg py-10">
          <p className="font-bold text-2xl mb-8 ">
          My Project Code Explanation | JobQuest
          </p>
          {/* Express Token */}
         
          <p>
            I have build this project following the PH Team requirements. This is an MERN Stack Job Seeking and Hiring Project Named <span className="text-[var(--clr-focused)]">JobQuest</span>.  
          </p>

          {/* Technologies */}
          <p className="text-xl mt-4 font font-medium mb-4">Technologies in this project</p>
          <ul>
          
            <li>-- Express</li>
            <li>-- MongoDb</li>
            <li>-- React Router DOM</li>
            <li>-- Firebase</li>
            <li>-- Tailwind CSS.</li>
            <li>-- Daisy UI  etc.</li>
          </ul>

          {/* Packages */}
          <p className="text-xl mt-4 font font-medium mb-4">Packages Used In this project</p>
          <ul>
            <li>-- Tanstack Query, axios for data fetching</li>
            <li>-- React Helmet Async for Dynamic page Title</li>
            <li>-- Sweet Alert2 for displaying custom alerts and notifications.</li>
            <li>-- Datepicker to pick date.</li>
            <li>-- Framer Motion to add animation.</li>
            <li>-- React tabs to display category wise jobs.</li>
            <li>-- React tabs to display category wise jobs.</li>
          </ul>
          <p className="text-xl mt-4 font font-medium mb-2">
            Now  explanation of components
          </p>
          <div className="">
            <p><span className="font-medium">Navbar :</span> Displays navigation links to different sections of the website and dynamically changes based on user authentication status.  </p>
            <p><span className="font-medium"> Footer: :</span> Provides essential information such as the website logo, name, copyright, contact details, and social media links.  </p>
            <p><span className="font-medium"> Login:  :</span> Allows users to log in with their email and password or using Google Sign-in. Includes a link to the registration page.  </p>
            <p><span className="font-medium">Registration:   :</span> Enables users to create a new account by providing their name, email, password, and optional photo URL.  </p>
            <p><span className="font-medium"> Home:  :</span> Features a banner section with a slider and a job-by-category section with tabs for various job types.  </p>
            <p><span className="font-medium">Blogs  :</span> Displays blog posts answering specific questions related to access tokens, refresh tokens, Express.js, Nest JS, and code explanations.  </p>
            <p><span className="font-medium">AllJobs:  :</span> Shows all job listings in a tabular format, with the ability to search by job title and view details of each job.  </p>
            <p><span className="font-medium">JobDetails:   :</span> Presents detailed information about a single job, including the job banner, title, description, salary range, and application details.  </p>
            <p><span className="font-medium"> AddJob:  :</span> Allows logged-in users to add new job listings, providing details such as the job banner, title, category, salary range, and application deadline.  </p>
            <p><span className="font-medium"> MyJobs: :</span> Displays job listings created by the current user, allowing them to update or delete their posted jobs.  </p>
            <p><span className="font-medium"> AppliedJobs:  :</span> Shows job listings for which the current user has applied, with options to filter by job category.  </p>
            <p><span className="font-medium">NotFound:  :</span> A custom 404 page with a fun image/gif and a button to return to the home page.  </p>

            <p className="mt-4">
              
In summary, this project encompasses a user-friendly job-seeking website with authentication, job management, and informative blogs. It employs various technologies and components for seamless navigation, appealing design, and robust functionality, meeting project requirements effectivel
            </p>
                      
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
