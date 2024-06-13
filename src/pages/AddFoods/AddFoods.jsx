import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/images/banner/add-foods.jpg";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet";

const AddFoods = () => {
    // Context for getting currently logged-in user
    const { user } = useContext(AuthContext);

    // State variables for form fields
    const [foodData, setFoodData] = useState({
        FoodName: "",
        FoodImage: "",
        FoodCategory: "",
        Price: 0.00,
        MadeBy: "",
        FoodOrigin: "",
        Description: "",
        Quantity: 0,
        PurchageCount: 0,
        AddedByName: user.displayName,
        AddedByEmail: user.email,
        TotalRating: 0,
        TotalRatingCount: 0,
    });

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if quantity or price is less than or equal to 0
        if (foodData.Quantity <= 0 || foodData.Price <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Quantity or Price",
                text: "Quantity and Price must be greater than 0. Please update them.",
            });
            return; // Exit submission process
        }

        try {
            // Send data to backend API
            const response = await axios.post("https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood", foodData);

            // Check if the request was successful
            if (response.status === 200) {
                // Show success message using Swal alert
                Swal.fire({
                    icon: "success",
                    title: "Food added successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Reset form fields
                setFoodData({
                    FoodName: "",
                    FoodImage: "",
                    FoodCategory: "",
                    Price: 0.00,
                    MadeBy: "",
                    FoodOrigin: "",
                    Description: "",
                    Quantity: 0,
                    PurchageCount: 0,
                    AddedByName: user.displayName,
                    AddedByEmail: user.email,
                    TotalRating: 0,
                    TotalRatingCount: 0,
                });

                // Log success message
                console.log("Food added successfully!");
            }
        } catch (error) {
            // Handle errors using Swal alert
            Swal.fire({
                icon: "error",
                title: "Failed to add food",
                text: error.message,
            });
            console.error("Failed to add food:", error);
        }
    };

    // Handler for input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({
            ...foodData,
            [name]: value,
        });
    };

    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: Add Food :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Add Food Page" />
            </Helmet>
            <div>
                <Banner banner_title={"Add Food"} bannerImg={bannerImg} />
            </div>
            <div className="container mx-auto my-24">
                <div>
                    <h2 className=" text-3xl font-courgette text-center text-orange-500 ">Add Your Favorite Food</h2>
                    <p className=" text-center text-black dark:text-slate-400">Is there anything missing? why not add it by yourself !!!</p>
                </div>
                <div className="border rounded-lg p-14 my-8">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Food Name */}
                        <div className="FoodName">
                            <div className="label">
                                <span className="label-text">Food Name</span>
                            </div>
                            <input
                                name="FoodName"
                                type="text"
                                placeholder="Enter food name"
                                className="input input-bordered w-full"
                                value={foodData.FoodName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Food Image */}
                        <div className="FoodImage">
                            <div className="label">
                                <span className="label-text">Food Image</span>
                            </div>
                            <input
                                name="FoodImage"
                                type="text"
                                placeholder="Enter food image URL"
                                className="input input-bordered w-full"
                                value={foodData.FoodImage}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Food Category */}
                        <div className="FoodCategory">
                            <div className="label">
                                <span className="label-text">Food Category</span>
                            </div>
                            <input
                                name="FoodCategory"
                                type="text"
                                placeholder="Enter food category"
                                className="input input-bordered w-full"
                                value={foodData.FoodCategory}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Quantity */}
                        <div className="Quantity">
                            <div className="label">
                                <span className="label-text">Quantity</span>
                            </div>
                            <input
                                name="Quantity"
                                type="text"
                                placeholder="Enter quantity"
                                className="input input-bordered w-full"
                                value={foodData.Quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Price */}
                        <div className="Price">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                name="Price"
                                type="text"
                                placeholder="Enter price"
                                className="input input-bordered w-full"
                                value={foodData.Price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Food Origin */}
                        <div className="FoodOrigin">
                            <div className="label">
                                <span className="label-text">Food Origin</span>
                            </div>
                            <input
                                name="FoodOrigin"
                                type="text"
                                placeholder="Enter food origin"
                                className="input input-bordered w-full"
                                value={foodData.FoodOrigin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Made by */}
                        <div className="MadeBy">
                            <div className="label">
                                <span className="label-text">Made by{"("}Chef{")"}</span>
                            </div>
                            <input
                                name="MadeBy"
                                type="text"
                                placeholder="Enter chef name"
                                className="input input-bordered w-full"
                                value={foodData.MadeBy}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Added by */}
                        <div className="AddedBy">
                            <div className="label">
                                <span className="label-text">Added by</span>
                            </div>
                            <input
                                name="AddedBy"
                                type="text"
                                placeholder="User Name"
                                className="input input-bordered w-full"
                                value={foodData.AddedByName + " ( " + foodData.AddedByEmail + " ) "}
                                readOnly
                            />
                        </div>
                        {/* Short Description */}
                        <div className="ShortDescription">
                            <div className="label">
                                <span className="label-text">Short Description</span>
                            </div>
                            <textarea
                                name="Description"
                                className="textarea textarea-bordered h-24 w-full"
                                placeholder="Enter short description"
                                value={foodData.Description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        {/* Add Item Button */}
                        <button className="btn btn-outline w-full bg-black">Add Item</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFoods;