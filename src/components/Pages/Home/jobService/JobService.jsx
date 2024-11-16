const JobService = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-4 lg:gap-12 justify-between">
      <div className="md:w-1/2 max-w-md flex-grow relative">
        <img
          src="https://i.ibb.co/RSyHgGL/working-man.jpg"
          alt=""
          className="rounded-md w-full h-full lg:ml-24"
        />

        {/* candidates */}
      <div className="absolute lg:bottom-12 left-1/2 -translate-x-1/2 lg:translate-x-0 -bottom-12 lg:left-0 card-style w-fit p-6 rounded-md">
              <p className="text-center font-bold mb-2 text-sm">10k+ Candidates</p>
        <div className="w-fit flex items-center">
          <div className="rounded-full border-2 w-12 h-12">
            <img
              src="https://i.ibb.co/kD7n6Mw/Screenshot-11.png"
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="rounded-full border-2 w-12 h-12 -ml-4">
            <img
              src="https://i.ibb.co/smgsrQK/Screenshot-12.png"
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="rounded-full border-2 w-12 h-12 -ml-4">
            <img
              src="https://i.ibb.co/WyCcpPV/1-intro-photo-final.jpg
"
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="rounded-full border-2 w-12 h-12 -ml-4">
            <img
              src="https://i.ibb.co/PNH7XTC/istockphoto-1437816897-612x612.jpg"
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="rounded-full border-2 w-12 h-12 flex items-center justify-center text-black text-xl bg-[var(--clr-focused-light)] -ml-4">
            <p>+</p>
          </div>
        </div>
      </div>


      </div>
      {/* content */}
      <div className="md:w-1/2 md:ml-6 lg:ml-24 mt-20 md:mt-2">
        <h2>Find Jobs with 3 easy steps</h2>
        <p className="mt-4">
          Register, explore resumes, find perfect candidates. Simplify hiring
          with our streamlined process. Start today!
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <div className="z-0 py-2 px-4 w-fit rounded-full bg-[var(--clr-focused-light)] text-[--clr-light]">
                1
              </div>
              <div className="absolute -top-1 -left-1.5 z-10 py-2 px-4 w-fit rounded-full bg-[var(--clr-focused)] text-[--clr-light]">
                1{" "}
              </div>
            </div>
            <p className="font-bold text-lg">Register an account to start</p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="relative">
              <div className="z-0 py-2 px-4 w-fit rounded-full bg-[var(--clr-focused-light)] text-[--clr-light]">
                2
              </div>
              <div className="absolute -top-1 -left-1.5 z-10 py-2 px-4 w-fit rounded-full bg-[var(--clr-focused)] text-[--clr-light]">
                2{" "}
              </div>
            </div>
            <p className="font-bold text-lg">
              Explore our thousands of resumes
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="relative">
              <div className="z-0 py-2 px-4 w-fit rounded-full bg-[var(--clr-focused-light)] text-[--clr-light]">
                3
              </div>
              <div className="absolute -top-1 -left-1.5 z-10 py-2 px-4 w-fit rounded-full bg-[var(--clr-focused)] text-[--clr-light]">
                3
              </div>
            </div>
            <p className="font-bold text-lg">
              Find the most suitable candidates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobService;
