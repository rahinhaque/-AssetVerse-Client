import { motion } from "framer-motion";

const steps = [
  {
    title: "Sign Up",
    description: "Create your HR or Employee account in seconds.",
    icon: "https://img.icons8.com/ios/50/000000/add-user-group-man-man.png",
  },
  {
    title: "Add Assets",
    description: "Easily track all company assets in one dashboard.",
    icon: "https://img.icons8.com/ios/50/000000/box-important.png",
  },
  {
    title: "Manage & Assign",
    description: "Assign assets to employees and monitor usage.",
    icon: "https://img.icons8.com/ios/50/000000/task.png",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-base-100 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={step.icon}
                alt={step.title}
                className="mx-auto mb-4 w-12 h-12"
              />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
