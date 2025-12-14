import React from "react";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Packages from "../Packages/Packages";
import Features from "../features/Features";
import TestimonialsStats from "../../testimonials/Testimonials";
import Steps from "../../steps/Steps";
import Faqs from "../../Home/faqs/Faqs";
import ContactCTA from "../ContactCTA/ContactCTA";
import { Link } from "react-router-dom"; // Added: For the Dashboard link
import useAuth from "../../../hooks/useAuth"; // Added: To check if user is logged in (adjust path if needed)

const Home = () => {
  const { user } = useAuth(); // Added: Get user from auth context

  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
      <Features></Features>
      <TestimonialsStats></TestimonialsStats>
      <Steps></Steps>
      <Faqs></Faqs>
      <ContactCTA></ContactCTA>

      {/* Added: Conditional Dashboard button at the bottom */}
      {user && (
        <div className="text-center mt-8">
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
