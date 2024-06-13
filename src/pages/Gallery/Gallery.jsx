import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/images/banner/gallery.jpg";
import PhotoGalleryCard from "../../components/PhotoGalleryCard/PhotoGalleryCard";
import { FaImage } from "react-icons/fa6";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Gallery = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [photoList, setPhotoList] = useState(useLoaderData());

    const handleClose = (e) => {
        e.preventDefault();
        document.getElementById("addImageModal").close();
    };

    const handleAddPhoto = async (e) => {
        e.preventDefault();

        // collecting data
        const formData = e.target;
        const userName = user?.displayName;
        const userEmail = user?.email;
        const feedback = formData.feedback.value;
        const photoUrl = formData.photoUrl.value;

        // create sending data
        const dataToBeSent = { userName: userName, email: userEmail, feedback: feedback, photoUrl: photoUrl };

        // Send data to backend
        try {
            const response = await fetch("https://b9a11-server-side-mdsabbiralmamon.vercel.app/photo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToBeSent),
            });

            if (response.ok) {
                // Show success alert
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Photo added successfully.",
                    confirmButtonText: "OK",
                });
                // Close modal
                document.getElementById("addImageModal").close();
                // Reset form fields
                formData.reset();

                // Fetch the updated photo list
                const updatedPhotoListResponse = await fetch("https://b9a11-server-side-mdsabbiralmamon.vercel.app/photos");
                const updatedPhotoList = await updatedPhotoListResponse.json();
                setPhotoList(updatedPhotoList);
            }
            else {
                // Show error alert
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Failed to add photo. Please try again later.",
                    confirmButtonText: "OK",
                });
                // Close modal
                document.getElementById("addImageModal").close();
                // Reset form fields
                formData.reset();
            }
        } catch (error) {
            console.error("Error:", error);
            // Show error alert
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to add photo. Please try again later.",
                confirmButtonText: "OK",
            });
            // Close modal
            document.getElementById("addImageModal").close();
            // Reset form fields
            formData.reset();
        }
    };

    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: Gallery :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Gallery Page" />
            </Helmet>
            <div>
                <Banner banner_title={"Gallery"} bannerImg={bannerImg} />
            </div>
            <div className="container mx-auto mt-24">
                <div>
                    <h2 className=" text-3xl font-courgette text-center text-orange-500 ">View All Photos</h2>
                    <p className=" text-center text-black dark:text-slate-400">Explore what others say about our foods or Add your feedback</p>
                    <div className="flex justify-center items-center">
                        <button className="btn m-4" onClick={() => {
                            if (!user) {
                                // If user is not authenticated, redirect to login
                                navigate("/signin");
                            } else {
                                document.getElementById("addImageModal").showModal();
                            }
                        }}>
                            Add Photos <FaImage />{" "}
                        </button>
                    </div>
                </div>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-24">
                    {photoList.map((photo) => (
                        <PhotoGalleryCard key={photo._id} photo={photo} />
                    ))}
                </div>
                {/* Modal starts here */}
                <dialog id="addImageModal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add Photos</h3>
                        <div>
                            <form onSubmit={handleAddPhoto}>
                                {/* Name */}
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">User Name</span>
                                    </div>
                                    <input type="text" value={user?.displayName} placeholder="Your Name" className="input input-bordered w-full" readOnly />
                                </label>
                                {/* Feedback */}
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Your Feedback</span>
                                    </div>
                                    <textarea name="feedback" className="textarea textarea-bordered h-24" placeholder="Feedback" required></textarea>
                                </label>
                                {/* Photo Url */}
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Photo Url</span>
                                    </div>
                                    <input name="photoUrl" type="text" placeholder="Photo Url" className="input input-bordered w-full" required />
                                </label>
                                {/* if there is a button in form, it will close the modal */}
                                <div className="mt-4 flex gap-4">
                                    <button onClick={handleClose} className="btn">
                                        Cancel
                                    </button>
                                    <button className="btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Gallery;