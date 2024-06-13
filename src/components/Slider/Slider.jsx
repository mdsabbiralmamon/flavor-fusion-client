// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Slider images
import sliderImage1 from "../../assets/images/slider-photos/slider2.jpg";
import sliderImage2 from "../../assets/images/slider-photos/slider1.jpg";
import sliderImage3 from "../../assets/images/slider-photos/slider3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slider.css";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Slider = () => {
    return (
        <div className="h-screen">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide
                    className="text-white"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${sliderImage1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div>
                        <h2 className="font-bold text-5xl">Delight Your Palate with Exquisite Cuisine</h2>
                        <p className=" m-4 ">
                            Experience a culinary journey like no other, where every dish is a masterpiece crafted with passion and expertise.
                        </p>
                        <Link to="/all-foods">
                            <button className="btn m-4">
                                Explore Menu <FaArrowAltCircleRight />{" "}
                            </button>
                        </Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide
                    className="text-white"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${sliderImage2})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div>
                        <h2 className="font-bold text-5xl">Savor the Flavors of Authentic International Cuisine</h2>
                        <p className=" m-4 ">
                            Embark on a global gastronomic adventure and explore a diverse array of flavors from around the world, all in one place.
                        </p>
                        <button className="btn m-4">
                            Reserve a Table <FaArrowAltCircleRight />{" "}
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide
                    className="text-white"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${sliderImage3})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div>
                        <h2 className="font-bold text-5xl">Elevate Your Dining Experience with Unforgettable Moments</h2>
                        <p className="m-4 ">
                            Immerse yourself in an atmosphere of elegance and sophistication, where every meal becomes a cherished memory to treasure.
                        </p>
                        <button className="btn m-4">
                            Special Events <FaArrowAltCircleRight />{" "}
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
