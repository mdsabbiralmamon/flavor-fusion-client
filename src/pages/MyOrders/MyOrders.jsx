import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/images/banner/my-foods.jpg";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [allOrders, setAllOrders] = useState([]);
    const { email } = user;

    useEffect(() => {
        fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/orders/${email}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, [email]);

    const [ratings, setRatings] = useState({});

    const handleRating = (foodName, rating) => {
        // Implement the logic to handle rating
        console.log(`Rated ${foodName} with ${rating} stars`);
        // send rating to the server
        fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/storedFood/${foodName}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to send data to server');
                }
                return res.json();
            })
            .then((data) => {
                console.log("new data", data);
            })
            .catch((error) => {
                console.error("Error sending data:", error);
            });
    };

    const onSubmit = (event, order) => {
        event.preventDefault();
        // Call handleRating with the FoodName and rating
        handleRating(order.FoodName, ratings[order._id] || '');
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://b9a11-server-side-mdsabbiralmamon.vercel.app/orders/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setAllOrders(allOrders.filter((order) => order._id !== id));
                        // Remove the rating from the state when the order is deleted
                        const newRatings = { ...ratings };
                        delete newRatings[id];
                        setRatings(newRatings);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    const handleRatingChange = (orderId, value) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [orderId]: value
        }));
    };

    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: {`${user.displayName}'s orders`} :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - order Page" />
            </Helmet>
            <div>
                <Banner banner_title={"My Orders"} bannerImg={bannerImg} />
            </div>
            <div className="container mx-auto my-24">
                <div>
                    <h2 className="text-3xl font-courgette text-center text-orange-500">View All your orders</h2>
                    <p className="text-center text-black dark:text-slate-400">Want to see or delete orders you can do it here !!!</p>
                </div>
                <div className="border rounded-lg p-14 my-8">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Food Name</th>
                                    <th scope="col" className="px-6 py-3">Image</th>
                                    <th scope="col" className="px-6 py-3">Order Date</th>
                                    <th scope="col" className="px-6 py-3">Ordered By</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3"><span className="sr-only">Update</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders.map((order) => (
                                    <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order.FoodName}
                                        </th>
                                        <td className="px-6 py-4">
                                            <img className="h-16 w-16 rounded-lg" src={order.FoodImage} alt={order.FoodName} />
                                        </td>
                                        <td className="px-6 py-4">{order.OrderDate}</td>
                                        <td className="px-6 py-4">{order.BuyerName}</td>
                                        <td className="px-6 py-4">{order.Price} $</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDelete(order._id)} className="btn btn-outline border-white text-white w-full bg-red-500">Delete Order</button>
                                            {/* Rating selecting option */}
                                            <form onSubmit={(e) => onSubmit(e, order)} className="my-4">
                                                <div className="Rating my-4">
                                                    <div className="label">
                                                        <span className="label-text">Rate This Food</span>
                                                    </div>
                                                    <input
                                                        name="rating"
                                                        type="number"
                                                        placeholder="0 ⭐"
                                                        className="input input-bordered w-full"
                                                        required
                                                        min="1"
                                                        max="5"
                                                        value={ratings[order._id] || ''}
                                                        onChange={(e) => handleRatingChange(order._id, e.target.value)}
                                                    />
                                                </div>
                                                <div className="my-4">
                                                    <button className="btn btn-outline w-full bg-black">Update Rating</button>
                                                </div>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyOrders;
