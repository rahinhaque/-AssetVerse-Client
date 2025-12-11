import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const ContactCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-primary text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to simplify asset management?
        </h2>
        <p className="mb-8 text-lg">
          Contact us today or get started with a free trial!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary"
          onClick={() => navigate("/contact")}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default ContactCTA;
