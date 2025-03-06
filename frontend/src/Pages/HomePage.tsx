import { Footer } from "../Components/Footer";
import { Hero } from "../Components/Hero";
import Navbar from "../Components/Navbar";

import { BooleanProvider } from "../context/UseBoolean";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <BooleanProvider>
        <Hero />
      </BooleanProvider>
      <Footer />
    </>
  );
};

export default HomePage;
