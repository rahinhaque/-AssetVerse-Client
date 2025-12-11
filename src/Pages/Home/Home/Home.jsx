import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Packages from '../Packages/Packages';
import Features from '../features/Features'
import TestimonialsStats from '../../testimonials/Testimonials';
import Steps from '../../steps/Steps'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
      <Features></Features>
      <TestimonialsStats></TestimonialsStats>
      <Steps></Steps>
    </div>
  );
};

export default Home;