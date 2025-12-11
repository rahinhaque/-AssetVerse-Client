import { motion } from "framer-motion";

const faqs = [
  {
    question: "Can I switch packages later?",
    answer: "Yes, you can upgrade or downgrade anytime from your dashboard.",
  },
  {
    question: "Is my data secure?",
    answer: "We use encryption and secure cloud storage to protect your data.",
  },
  {
    question: "How many employees can I manage?",
    answer: "It depends on your subscription package.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="border rounded-lg p-4 cursor-pointer hover:bg-base-100 transition"
            >
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
