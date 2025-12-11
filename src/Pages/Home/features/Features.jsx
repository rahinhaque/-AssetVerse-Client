import React from "react";
import { motion } from "framer-motion";
import {
  FaRegLightbulb,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRegLightbulb size={36} className="text-primary mx-auto" />,
    title: "Idea Management",
    description:
      "Collect, track, and implement new ideas efficiently across your team.",
  },
  {
    icon: <FaChartLine size={36} className="text-primary mx-auto" />,
    title: "Analytics",
    description:
      "Visualize usage trends, asset allocation, and performance reports.",
  },
  {
    icon: <FaUsers size={36} className="text-primary mx-auto" />,
    title: "Team Management",
    description:
      "Assign roles, manage teams, and track employee contributions effortlessly.",
  },
  {
    icon: <FaShieldAlt size={36} className="text-primary mx-auto" />,
    title: "Security",
    description:
      "Ensure data safety with role-based access control and permissions.",
  },
];

const FeaturesShowcase = () => {
  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why <span className="text-primary">AssetVerse</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
