import { FaArrowRight } from "react-icons/fa";
import imgSrc from "../../assets/images/home-photos/our-story.jpg"
import { motion } from "framer-motion";

const OurStory = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex justify-center items-center">
                <div>
                    <h3 className=" font-courgette text-3xl text-orange-500 text-center ">Welcome to</h3>
                    <h2 className=" font-bold text-5xl text-center leading-[70px]">Flavour Fusion</h2>
                    <p className=" text-sm text-center ">At Bangladeshi Flavor Fusion, we are more than just a restaurant - we are a celebration of exquisite flavors, rich culture, and unparalleled hospitality. </p>
                    <div className="flex gap-4 justify-center items-center my-8 cursor-pointer ">
                    <h4 className="text-sm">OUR STORY </h4>
                    <h4 className="text-sm"><FaArrowRight /></h4>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center mt-8">
                <motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className=" h-96 w-96 rounded-lg " src={imgSrc} alt="Our Story" />
            </div>
        </div>
    );
};

export default OurStory;