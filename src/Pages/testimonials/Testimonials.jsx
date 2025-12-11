import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "AssetVerse has completely transformed how we manage our company assets.",
    name: "Sarah Johnson",
    title: "HR Manager, TechCorp",
    logo: "https://via.placeholder.com/40",
  },
  {
    quote: "The dashboard is intuitive and makes asset tracking effortless.",
    name: "Michael Lee",
    title: "Operations Lead, FinCorp",
    logo: "https://via.placeholder.com/40",
  },
  {
    quote: "Our team productivity improved after using AssetVerse.",
    name: "Emily Clark",
    title: "HR Director, HealthPlus",
    logo: "https://via.placeholder.com/40",
  },
];

const stats = [
  { label: "Companies Trust Us", value: "100+" },
  { label: "Assets Managed", value: "5000+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Employees Supported", value: "2000+" },
];

const TestimonialsStats = () => {
  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What People Are Saying & Stats That Matter
        </h2>

        
        <div className="grid lg:grid-cols-2 gap-12">
         
          <div className="space-y-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-base-100 p-6 rounded-xl shadow-lg"
              >
                <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.logo}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-primary text-white p-6 rounded-xl flex flex-col items-center justify-center shadow-lg"
              >
                <p className="text-3xl md:text-4xl font-bold">{s.value}</p>
                <p className="mt-2 text-center">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStats;
