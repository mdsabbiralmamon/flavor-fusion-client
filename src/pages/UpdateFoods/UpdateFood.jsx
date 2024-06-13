import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/images/banner/my-foods.jpg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const UpdateFood = () => {
    const {id} = useParams();

    // console.log("id is " + id);
    const [previousData, setPreviousData] = useState({});

    useEffect(() => {
        fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood/food/${id}`)
            .then(res => res.json())
            .then(data => setPreviousData(data))
    },[id])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dataToBeSent = Object.fromEntries(formData.entries());

        console.log("data to be sent", dataToBeSent);

        try {
            const response = await fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood/food/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToBeSent),
            });
    
            if (response.ok) {
                await response.json();
                // Show success message using SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Food data updated successfully!',
                });
            } else {
                // Show error message using SweetAlert if the request fails
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error('Error updating food data:', error);
            // Show error message using SweetAlert if an exception occurs
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while updating food data!',
            });
        }
    }

    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: Update Food :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Update Food Page" />
            </Helmet>
            <div>
                <Banner banner_title={"Update Food"} bannerImg={bannerImg} />
            </div>
            <div className="container mx-auto my-24">
                <div>
                    <h2 className="text-3xl font-courgette text-center text-orange-500">Update Your Food</h2>
                    <p className="text-center text-black dark:text-slate-400">modify data !!!</p>
                </div>
                <div className="border rounded-lg p-14 my-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Food Name */}
                        <div className="FoodName">
                            <div className="label">
                                <span className="label-text">Food Name</span>
                            </div>
                            <input
                                name="FoodName"
                                defaultValue={previousData.FoodName}
                                type="text"
                                placeholder="Enter food name"
                                className="input input-bordered w-full"
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
                                defaultValue={previousData.FoodImage}
                                type="text"
                                placeholder="Enter food image URL"
                                className="input input-bordered w-full"
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
                                defaultValue={previousData.FoodCategory}
                                type="text"
                                placeholder="Enter food category"
                                className="input input-bordered w-full"
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
                                defaultValue={previousData.Quantity}
                                placeholder="Enter quantity"
                                className="input input-bordered w-full"
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
                                defaultValue={previousData.Price}
                                placeholder="Enter price"
                                className="input input-bordered w-full"
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
                                defaultValue={previousData.FoodOrigin}
                                placeholder="Enter food origin"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        {/* Made by */}
                        <div className="MadeBy">
                            <div className="label">
                                <span className="label-text">Made by (Chef)</span>
                            </div>
                            <input
                                name="MadeBy"
                                type="text"
                                defaultValue={previousData.MadeBy}
                                placeholder="Enter chef name"
                                className="input input-bordered w-full"
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
                                defaultValue={previousData.AddedByName}
                                placeholder="User Name"
                                className="input input-bordered w-full"
                                readOnly
                            />
                        </div>
                        {/* Purchage Count */}
                        <div className="PurchageCount">
                            <div className="label">
                                <span className="label-text">Purchase Count</span>
                            </div>
                            <input
                                name="PurchageCount"
                                type="number"
                                defaultValue={previousData.PurchageCount}
                                placeholder="Purchase Count"
                                className="input input-bordered w-full"
                                readOnly
                            />
                        </div>
                        {/* Added by email*/}
                        <div className="AddedByEmail">
                            <div className="label">
                                <span className="label-text">Added by Email</span>
                            </div>
                            <input
                                name="AddedByEmail"
                                type="email"
                                defaultValue={previousData.AddedByEmail}
                                placeholder="Email Address"
                                className="input input-bordered w-full"
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
                                defaultValue={previousData.Description}
                                className="textarea textarea-bordered h-24 w-full"
                                placeholder="Enter short description"
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

export default UpdateFood;
