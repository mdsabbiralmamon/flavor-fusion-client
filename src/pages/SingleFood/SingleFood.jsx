import { Link, useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import { FaCartShopping } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const SingleFood = () => {

    // load single food
    const { _id, FoodImage, FoodName, Price, FoodCategory, MadeBy, FoodOrigin, Description, AverageRating, TotalRatingCount } = useLoaderData();

    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: Single Food :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Single Food Page" />
            </Helmet>
            <div>
                <Banner banner_title={"Food Details"} bannerImg={FoodImage} />
            </div>
            <div className="container mx-auto rounded-3xl bg-white -mt-20 p-12 mb-24 border-t-4 border-orange-500 space-y-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center ">
                    <h2 className=" text-5xl font-courgette font-extrabold text-orange-500 ">{FoodName}</h2>
                    <p className=" text-xl font-bold text-orange-500 ">{`${Price} $`}</p>
                </div>
                <div>
                    <div className="badge badge-outline text-orange-500 ">Free Delivery</div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-700 border-b-4 border-orange-500">Details :</h2>
                    <div className="w-full h-96 overflow-hidden rounded-lg my-4 flex justify-center items-center">
                        <img className="bg-cover w-full rounded-lg" src={FoodImage} alt={FoodName} />
                    </div>
                    <p className="text-slate-600"><span className="font-bold text-slate-700">Food Category: </span> {FoodCategory}</p>
                    <p className="text-slate-600"><span className="font-bold text-slate-700">MadeBy: </span> {MadeBy}</p>
                    <p className="text-slate-600"><span className="font-bold text-slate-700">FoodOrigin: </span> {FoodOrigin}</p>
                    <p className="text-slate-600"><span className="font-bold text-slate-700">Description: </span> {Description}</p>
                    <p className="text-slate-600"><span className="font-bold text-slate-700">Rating: </span> {`${AverageRating}⭐ (Rated by ${TotalRatingCount} Person)`}</p>
                    <Link to={`/purchase/${_id}`}>
                        <div className=" btn bg-orange-500 text-white flex gap-4 items-center justify-center mt-8">
                            <FaCartShopping /> <p>Purchase</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleFood;