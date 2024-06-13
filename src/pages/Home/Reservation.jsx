import imgSrc from "../../assets/images/home-photos/our-story.jpg"
import { motion } from "framer-motion";

const Reservation = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex justify-center items-center">
                <div>
                    <h3 className=" font-courgette text-3xl text-orange-500 text-center ">Reservation</h3>
                    <h2 className=" font-bold text-5xl text-center leading-[70px]">BOOK TABLE</h2>
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                        {/* Date */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Date</span>
                            </div>
                            <input type="date" placeholder="Date" className="input border-orange-500 input-bordered w-full" />
                        </label>
                        {/* Name */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" placeholder="Full Name" className="input border-orange-500 input-bordered w-full" />
                        </label>
                        {/* Time */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Time</span>
                            </div>
                            <input type="time" placeholder="Date" className="input border-orange-500 input-bordered w-full" />
                        </label>
                        {/* Phone */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Phone</span>
                            </div>
                            <input type="phone" placeholder="Mobile Number" className="input border-orange-500 input-bordered w-full" />
                        </label>
                        {/* People */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">People</span>
                            </div>
                            <input type="number" placeholder="Members Count" className="input border-orange-500 input-bordered w-full" />
                        </label>
                        {/* Email */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input type="email" placeholder="Email" className="input border-orange-500 input-bordered w-full" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center mt-8">
                <motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className=" h-96 w-96 rounded-lg " src={imgSrc} alt="Our Story" />
            </div>
        </div>
    );
};

export default Reservation;