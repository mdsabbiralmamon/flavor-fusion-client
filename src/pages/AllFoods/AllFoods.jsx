import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/images/banner/all-foods.jpg"
import { useLoaderData } from "react-router-dom";
import FoodCard from "../../components/FoodCard/FoodCard";
import { Helmet } from "react-helmet";

const AllFoods = () => {
    const allFoods = useLoaderData([]);
    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: All Foods :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - All Food Page" />
            </Helmet>
            <div>
                <Banner banner_title={"All Foods"} bannerImg={bannerImg} />
            </div>
            <div className="my-24">
                    <h2 className=" text-3xl font-courgette text-center text-orange-500 ">View All Foods</h2>
                    <p className=" text-center text-black dark:text-slate-400">Explore all of our foods to purchase</p>
            </div>
            <div className="container mx-auto grid mb-24 gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    allFoods.map(food => <FoodCard key={food._id} food={food} />)
                }
            </div>
        </div>
    );
};

export default AllFoods;