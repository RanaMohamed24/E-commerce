import "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsLetterBox";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-700">
            77 El-Nasr Rd <br /> Nasr City, Cairo, Egypt
          </p>
          <p className="text-gray-600">
            Tel: 01234567890 <br /> E-mail: admin@fabfit.com
          </p>
        </div>
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
