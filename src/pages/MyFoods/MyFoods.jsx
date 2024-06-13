import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/images/banner/my-foods.jpg"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyFoods = () => {
    const { user } = useContext(AuthContext);
    const { email } = user;

    const [allStoredFoodsByUser, setAllStoredFoodsByUser] = useState([]);



    // Fetch data from the server belonging to this email
    useEffect(() => {
        fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood/${email}`, {credentials: 'include'})
            .then((res) => res.json())
            .then((allFoods) => {
                setAllStoredFoodsByUser(allFoods);
            });
    }, [email]);

    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: {" "}{user?.displayName}{"'"}{"s "} Food :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - My Food Page" />
            </Helmet>
            <div>
                <Banner banner_title={"My Added Foods"} bannerImg={bannerImg} />
            </div>
            <div className="container mx-auto my-24">
                <div>
                    <h2 className=" text-3xl font-courgette text-center text-orange-500 ">Look at your personal dishes</h2>
                    <p className=" text-center text-black dark:text-slate-400">You can update or delete your dishes from here !!!</p>
                </div>
                <div className="border rounded-lg p-14 my-8">


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Food Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Update</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allStoredFoodsByUser.map((storedFood) => <tr key={storedFood._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {storedFood.FoodName}
                                        </th>
                                        <td className="px-6 py-4">
                                            <img className=" h-16 w-16 rounded-lg " src={storedFood.FoodImage} alt={storedFood.FoodName} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {storedFood.FoodCategory}
                                        </td>
                                        <td className="px-6 py-4">
                                            {storedFood.Price} {" $"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/update-food/${storedFood._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</Link>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyFoods;