import {motion} from 'framer-motion';
import {fadeIn} from '../../../../Variants/Variants';
import SecHeader from "../../../Shared/SecHeader/SecHeader";

const TopCompanies = () => {
  return (
    <section>
      <div className="text-center">
        <motion.div
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{once:false, amount:0.7}}
        
        >
      <SecHeader name="To p Companies" title="Top Companies in the Industry"></SecHeader>
        </motion.div>
      </div>
      {/* Cards */}
        <motion.div 
          variants={fadeIn("top", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false, amount:0.7}}

        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center mt-12 lg:justify-between">
          {/* card 1*/}
          <div className="card-style p-6 text-center w-72 lg:w-60 xl:w-72 mx-auto rounded-2xl border-2 hover:border-[var(--clr-focused)]">
            <img src="https://i.ibb.co/SKXCy1T/Macdonald.png" alt="" className="w-24 h-auto mx-auto"/>
            <h5>MacDonald</h5>
            <p className="mb-6 mt-2">New York, New York Satellite, <br /> Washington... </p>
            <div className="border-2 border-[var(--clr-focused)] py-1 px-4 rounded-md w-fit mx-auto text-[var(--clr-focused)] font-bold">
              3 Open Jobs
            </div>

          </div>
          {/* card 2*/}
          <div className="card-style p-6 text-center w-72 lg:w-60 xl:w-72 mx-auto rounded-2xl border-2 hover:border-[var(--clr-focused)]">
            <img src="https://i.ibb.co/52SM3vC/Payoneer.png" alt="" className="w-24 h-auto mx-auto"/>
            <h5>Payoneer</h5>
            <p className="mb-6 mt-2">123 Main Street, Los Angeles, <br /> California ... </p>
            <div className="border-2 border-[var(--clr-focused)] py-1 px-4 rounded-md w-fit mx-auto text-[var(--clr-focused)] font-bold">
              4 Open Jobs
            </div>

          </div>
          {/* card 3*/}
          <div className="card-style p-6 text-center w-72 lg:w-60 xl:w-72 mx-auto rounded-2xl border-2 hover:border-[var(--clr-focused)]">
            <img src="https://i.ibb.co/SVcPB6H/LinkedIn.png" alt="" className="w-24 h-auto mx-auto"/>
            <h5>LinkedIn</h5>
            <p className="mb-6 mt-2">NOak Avenue, Chicago,, <br /> Illinois... </p>
            <div className="border-2 border-[var(--clr-focused)] py-1 px-4 rounded-md w-fit mx-auto text-[var(--clr-focused)] font-bold">
              10 Open Jobs
            </div>

          </div>
          {/* card 4*/}
          <div className="card-style p-6 text-center w-72 lg:w-60 xl:w-72 mx-auto rounded-2xl border-2 hover:border-[var(--clr-focused)]">
            <img src="https://i.ibb.co/9hQ4qhv/Medium.png" alt="" className="w-24 h-auto mx-auto"/>
            <h5>Medium</h5>
            <p className="mb-6 mt-2">NPine Road, Miami, <br /> Florida... </p>
            <div className="border-2 border-[var(--clr-focused)] py-1 px-4 rounded-md w-fit mx-auto text-[var(--clr-focused)] font-bold">
              7 Open Jobs
            </div>

          </div>

        </motion.div>
    </section>
  );
};

export default TopCompanies;