import { motion } from "framer-motion";
import team from "../../../assets/team.jpg";

const Banner = () => {
  return (
    <section className="bg-base-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
   
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Company Assets <br />
            <span className="text-primary">Without the Chaos</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            AssetVerse helps HR teams track, assign, and manage company assets
            effortlessly — all in one secure platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary px-8"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline px-8"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <img
            src={team}
            alt="Team collaboration"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />

         
          <div className="absolute inset-0 rounded-2xl bg-primary/5"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
