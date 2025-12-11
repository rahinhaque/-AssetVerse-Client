import { motion } from "framer-motion";
import {
  HiOutlineClipboardList,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from "react-icons/hi";

const About = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold">
            Why Choose <span className="text-primary">AssetVerse?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            AssetVerse helps companies streamline asset management with clarity,
            efficiency, and secure role-based workflows — ensuring HR teams stay
            in control without complexity.
          </p>
        </motion.div>

       
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <HiOutlineClipboardList className="text-primary text-5xl" />
            <h3 className="mt-4 text-xl font-semibold">
              Centralized Asset Tracking
            </h3>
            <p className="mt-2 text-gray-600">
              Manage all company assets in one place with real-time visibility
              and effortless tracking.
            </p>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <HiOutlineUserGroup className="text-primary text-5xl" />
            <h3 className="mt-4 text-xl font-semibold">
              Efficient Employee Assignment
            </h3>
            <p className="mt-2 text-gray-600">
              Assign assets to employees instantly and maintain transparent
              usage history without confusion.
            </p>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-8 bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <HiOutlineShieldCheck className="text-primary text-5xl" />
            <h3 className="mt-4 text-xl font-semibold">
              Secure & Role-Based Access
            </h3>
            <p className="mt-2 text-gray-600">
              Ensure sensitive operations stay protected with HR-only
              permissions and secure authentication.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
