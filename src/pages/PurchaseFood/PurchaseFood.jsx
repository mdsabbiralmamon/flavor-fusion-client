import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const PurchaseFood = () => {
    const { _id, FoodImage, FoodName, Price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const [purchasedFood, setPurchasedFood] = useState({});
    const [refetch, setRefetch] = useState(false);

    console.log("purchased food: ", purchasedFood);
    
    if (purchasedFood.Quantity <= 0) {
        document.getElementById("purchaseBtn").disabled = true;
        Swal.fire({
            title: "Quantity is low",
            text: "Please Wait until we restock our product",
            icon: "question"
        });
    }

    // console.log(purchasedFood.AddedByEmail, user.email);

    if (purchasedFood.AddedByEmail === user.email) {
        document.getElementById("purchaseBtn").disabled = true;
        Swal.fire({
            title: "Can not be purchased",
            text: "You can not purchase your own product",
            icon: "question"
        });
    }

    // handle purchase button disable when quantity is less than or equal 0
    useEffect(() => {
        fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood/food/${_id}`)
            .then(res => res.json())
            .then(data => {
                setPurchasedFood(data);
                // if (data.Quantity <= 0) {
                //     document.getElementById("purchaseBtn").disabled = true;
                //     Swal.fire({
                //         title: "Quantity is low",
                //         text: "Please Wait until we restock our product",
                //         icon: "question"
                //       });
                // }
            })
    }, [_id, refetch]);

    // Function to manually trigger fetch
    const refetchAfterSuccessfulPurchase = () => {
        setRefetch(prevState => !prevState);
    };

    // Update count data in database for each purchase
    const updateCountDataInDatabase = (_id, PurchageCount) => {
        fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood/foodCount/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ PurchageCount }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to send data to server');
                }
                return res.json();
            })
            .then((data) => {
                console.log("new count data", data);
            })
            .catch((error) => {
                console.error("Error sending count data:", error);
            });
    }

    // send order data to database
    const sendOrderDataToDatabase = (orderData) => {
        fetch("https://b9a11-server-side-mdsabbiralmamon.vercel.app/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to send data to server');
                }
                return res.json();
            })
            .then((data) => {
                console.log("new order data", data);
                // Show success message
                Swal.fire({
                    title: "Success!",
                    text: "Your order has been placed successfully.",
                    icon: "success"
                });
            })
            .catch((error) => {
                console.error("Error sending order data:", error);
                // Show error message
                Swal.fire({
                    title: "Error!",
                    text: "Failed to place order. Please try again later.",
                    icon: "error"
                });
            });
    }

    const handlePurchase = e => {
        refetchAfterSuccessfulPurchase();
        e.preventDefault();
    
        // collecting data
        const foodName = FoodName;
        const foodImage = FoodImage;
        const price = Price;
        const quantity = e.target.quantity.value;
        const date = new Date();
        const orderDate = date.toDateString();
        const orderTime = date.toLocaleTimeString();
    
        const order = {
            FoodName: foodName,
            FoodImage: foodImage,
            Price: price,
            Quantity: quantity,
            OrderDate: orderDate + ' ' + orderTime,
            BuyerName: user?.displayName,
            BuyerEmail: user?.email
        }
    
        // Alert
        Swal.fire({
            title: "Proceed to Purchase?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Purchase!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Validate quantity
                if (purchasedFood.Quantity < quantity) {
                    Swal.fire({
                        title: "Quantity is low",
                        text: "Please Wait until we restock our product",
                        icon: "question"
                    });
                    refetchAfterSuccessfulPurchase();
                } else {
                    refetchAfterSuccessfulPurchase();
                    if(purchasedFood.Quantity < quantity){
                        Swal.fire({
                            title: "Quantity is low",
                            text: "Please Wait until we restock our product",
                            icon: "question"
                        });
                        refetchAfterSuccessfulPurchase();
                    }
                    // Update count data in database for each purchase
                    sendOrderDataToDatabase(order);
                    updateCountDataInDatabase(_id, quantity);
                    
                }
            }
        });
    
        console.log(order);
    }
    


return (
    <div>
        <Helmet>
            <title>Flavor Fusion :: Purchase Food :: </title>
            <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Purchase Food Page" />
        </Helmet>
        <div>
            <Banner banner_title={"Purchase Food"} bannerImg={FoodImage} />
        </div>
        <div className="container mx-auto my-28">
            <div>
                <h2 className="text-3xl font-courgette text-center text-orange-500 ">Proceed to Purchase </h2>
                <p className="text-center text-black dark:text-slate-400">Fill up the form to purchase : {FoodName}</p>
            </div>
            <div className="border rounded-lg p-14 my-8">
                <form onSubmit={handlePurchase} className="container mx-auto space-y-8">
                    {/* Food Name */}
                    <div className="FoodName">
                        <div className="label">
                            <span className="label-text">Food Name</span>
                        </div>
                        <input name="foodName" value={FoodName} type="text" placeholder="Food Name" className="input input-bordered w-full" readOnly />
                    </div>
                    {/* Food Image */}
                    <div className="FoodImage">
                        <div className="label">
                            <span className="label-text">Food Image</span>
                        </div>
                        <input name="foodName" value={FoodImage} type="text" placeholder="Food Name" className="input input-bordered w-full" readOnly />
                    </div>
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                        {/* Price */}
                        <div className="Price">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input name="price" value={Price} type="number" placeholder="Price" className="input input-bordered w-full" readOnly />
                        </div>
                        {/* Quantity */}
                        <div className="Quantity">
                            <div className="label">
                                <span className="label-text">Quantity</span>
                            </div>
                            <input name="quantity" type="number" placeholder="Quantity" className="input input-bordered w-full" required />
                        </div>
                        {/* Buyer Name */}
                        <div className="BuyerName">
                            <div className="label">
                                <span className="label-text">Buyer Name</span>
                            </div>
                            <input name="buyerName" value={user?.displayName} type="text" placeholder="Buyer Name" className="input input-bordered w-full" readOnly />
                        </div>
                        {/* Buyer Email */}
                        <div className="BuyerEmail">
                            <div className="label">
                                <span className="label-text">Buyer Email</span>
                            </div>
                            <input name="buyerEmail" value={user?.email} type="email" placeholder="Buyer Email" className="input input-bordered w-full" readOnly />
                        </div>
                    </div>
                    <button id="purchaseBtn" className="btn btn-outline w-full bg-black">Purchase Now</button>
                </form>
            </div>
        </div>
    </div>
);
};

export default PurchaseFood;