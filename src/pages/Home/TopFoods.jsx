import { Parallax } from "react-parallax";
import bgImg from "../../assets/images/home-photos/discover.jpg"
import { useEffect, useState } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

const TopFoods = () => {
    const [foodList, setFoodList] = useState([]);
    useEffect(() => {
        fetch("https://b9a11-server-side-mdsabbiralmamon.vercel.app/topFoods")
            .then((res) => res.json())
            .then((data) => setFoodList(data))
    }, []);

    return (
        <>
            <Parallax className=" h-96 flex justify-center items-center " blur={{ min: 0, max: 5 }} bgImage={bgImg} bgImageAlt="Our Top Foods" strength={500}>
                <div>
                    <h3 className=" font-courgette text-3xl text-orange-500 text-center ">Discover Our</h3>
                    <h2 className=" font-bold text-5xl text-center leading-[70px]">Top Selling Foods</h2>
                </div>
            </Parallax>
            <div className="container mx-auto grid mt-24 gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    foodList.map(food => <FoodCard key={food._id} food={food} />)
                }
            </div>
            <div className="flex justify-center mt-12">
                <Link to="/all-foods">
                    <button className="btn m-4">
                        Explore Menu <FaArrowAltCircleRight />{" "}
                    </button>
                </Link>
            </div>
        </>
    );
};

export default TopFoods;