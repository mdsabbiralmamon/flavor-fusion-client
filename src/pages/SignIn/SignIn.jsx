import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/images/banner/login-banner.jpg";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SignIn = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });

    // navigation 
    const navigate = useNavigate();
    const location = useLocation();

    // Google Sign Up
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                // User logged in successfully
                const user = result.user;
                console.log("user logged in via google : ", user);
                Swal.fire({
                    title: "SignIn Success!",
                    text: "Successfully signed in, return to your destination!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                // navigate to destination
                navigate(location?.state ? location.state : "/gallery");
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                // Check if user cancelled the popup
                if (errorCode === "auth/popup-closed-by-user") {
                    Swal.fire({
                        title: "Cancelled",
                        text: "Google sign-in popup was closed by the user.",
                        icon: "warning",
                        confirmButtonText: "OK",
                    });
                } else {
                    // Show error alert for other errors
                    Swal.fire({
                        title: "Error",
                        text: "Failed to sign in with Google.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            });
    };

    // Github sign up
    const signUpwithGithub = () => {
        const errorMsg = "Not ready Yet!!"
        // Show error alert with specific message
        Swal.fire({
            icon: "error",
            title: "Try Google",
            text: errorMsg,
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        signInUser(email, password)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                console.log("SIGNED IN USER WITH : ", user);
                // Show success alert
                Swal.fire({
                    icon: "success",
                    title: "Sign In Success!",
                    text: "Welcome back to FlavorFusion!",
                    confirmButtonText: "OK"
                });
                // navigate to destination
                navigate(location?.state ? location.state : "/");
                // Clear form data
                setFormData({ email: "", password: "" });
            })
            .catch((error) => {
                // Sign in failed
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("ERROR: ", errorCode, errorMessage);
                // Show error alert
                Swal.fire({
                    icon: "error",
                    title: "Sign In Failed",
                    text: errorMessage,
                    confirmButtonText: "OK"
                });
            });
    };

    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: Sign In :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Sign In Page" />
            </Helmet>
            <div>
                <Banner banner_title={"Sign In"} bannerImg={bannerImg} />
            </div>
            <div className="container mx-auto my-28">
                <div>
                    <h2 className="text-3xl font-courgette text-center text-orange-500 ">Sign In to FlavorFusion</h2>
                    <p className="text-center text-black dark:text-slate-400">Welcome back to FlavorFusion! Please sign in to continue enjoying delicious meals and managing your food orders.</p>
                </div>
                <div className="border rounded-lg p-14 my-8">
                    <form className="container mx-auto space-y-8" onSubmit={handleSubmit}>
                        <div className="Email">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input name="email" type="email" placeholder="your-email@mail-server.com" className="input input-bordered w-full" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="Password">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input name="password" type="password" placeholder="Drop Your Password" className="input input-bordered w-full" value={formData.password} onChange={handleChange} />
                        </div>
                        <button className="btn btn-outline w-full bg-black">Sign In</button>
                        <div>
                            <p className="text-center text-black dark:text-slate-400">Don{"'"}t have an account? <a href="/signup" className="text-orange-500">Sign Up</a></p>
                        </div>
                    </form>
                    <div className="divider divider-neutral">Or Continue With</div>
                    <div className="flex gap-6 justify-center items-center">
                        <button onClick={signUpwithGithub} className="btn btn-outline text-xl"><FaGithub /></button>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline text-xl"><FaGoogle /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;