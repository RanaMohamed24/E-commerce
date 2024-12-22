import "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-5xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full  md:max-w-[400px] rounded-2xl"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-black">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="text-4xl py-8 ">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
        <div className="flex flex-col md:flex-row text-sm mt-8 gap-6">
          <div className="border-2 border-emerald-600 rounded-lg p-8 flex flex-col items-center text-center gap-4 shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="text-blue-500 text-2xl animate-bounce">
              <i className="fas fa-check-circle"></i>
            </div>
            <b>Quality Assurance</b>
            <p>
              Every product is meticulously vetted to meet our top-notch quality
              standards.
            </p>
          </div>

          <div className="border-2 border-pink-600 rounded-lg p-8 flex flex-col items-center text-center gap-4 shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="text-green-500 text-2xl animate-pulse">
              <i className="fas fa-headset"></i>
            </div>
            <b>Exceptional Customer Service</b>
            <p>
              Our team is dedicated to ensuring your satisfaction at every step.
            </p>
          </div>
          {/* Convenience */}
          <div className="border-2 border-yellow-600 rounded-lg p-8 flex flex-col items-center text-center gap-4 shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="text-yellow-500 text-2xl animate-spin">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <b>Convenience</b>
            <p>
              Enjoy a seamless shopping experience with our intuitive interface.
            </p>
          </div>
        </div>
      </div>
      <div className="pt-20">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
