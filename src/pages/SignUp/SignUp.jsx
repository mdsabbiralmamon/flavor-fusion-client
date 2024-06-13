import { useState } from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/images/banner/signup-banner.jpg";
import { FaGithub, FaGoogle, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SignUp = () => {
    const { signUpUser, googleSignIn, updateUserName, updatePhoto, logoutUser } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordStatus, setPasswordStatus] = useState({
        number: false,
        uppercase: false,
        lowercase: false,
        length: false,
    });

    const navigate = useNavigate();

    // send user data to database
    const sendUserDataToDatabase = (user) => {
        fetch("https://b9a11-server-side-mdsabbiralmamon.vercel.app/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("new user data", data);
            });
    }

    // Google Sign Up
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                // User logged in successfully
                const user = result.user;
                console.log("user logged in via google : ", user);
                Swal.fire({
                    title: "Successfully Signed Up!",
                    text: "Log in Now ...",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                // send data to db
                const userData = { name: user.displayName, email: user.email, photoUrl: user.photoURL };
                sendUserDataToDatabase(userData);
                // log out user
                logoutUser();
                // navigate to sign in page
                navigate("/signin");
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

    // validate password
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        const isValid = passwordRegex.test(password);
        if (!isValid) {
            setPasswordStatus({
                number: /\d/.test(password),
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                length: password.length >= 6,
            });
        }
        return isValid;
    };

    // password Authentication
    const handleSubmit = (e) => {
        e.preventDefault();
        // Clear previous error messages
        setPasswordError(null);
        const formData = e.target;
        const firstName = formData.firstName.value;
        const lastName = formData.lastName.value;
        const photoUrl = formData.photoUrl.value;
        const email = formData.email.value;
        const password = formData.password.value;

        if (!validatePassword(password)) {
            let errorMessage = "Password must ";
            if (!passwordStatus.number) errorMessage += "contain at least 1 number, ";
            if (!passwordStatus.uppercase) errorMessage += "contain at least 1 uppercase letter, ";
            if (!passwordStatus.lowercase) errorMessage += "contain at least 1 lowercase letter, ";
            if (!passwordStatus.length) errorMessage += "be at least 6 characters long, ";
            errorMessage = errorMessage.slice(0, -2); // Remove the trailing comma and space
            setPasswordError(errorMessage);
            // Show error alert with specific message
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: errorMessage,
            });
            return;
        }

        // Reset password status to show all checks as green
        setPasswordStatus({
            number: true,
            uppercase: true,
            lowercase: true,
            length: true,
        });

        // sign up user
        signUpUser(email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log("signed up user", user);
                // Success alert
                Swal.fire({
                    icon: "success",
                    title: "Signed Up Successfully!",
                    text: "Log in now...",
                });
                // Update user
                const name = firstName + " " + lastName;
                updateUserName(name);
                updatePhoto(photoUrl);

                // send data to db
                const userData = { name: firstName + " " + lastName, email: email, photoUrl: photoUrl };
                sendUserDataToDatabase(userData);

                // log out user
                logoutUser();

                // navigate to sign in page
                navigate("/signin");

                // Clear form data
                formData.reset();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // Error alert
                Swal.fire({
                    icon: "error",
                    title: "Sign Up Failed",
                    text: errorMessage,
                });
            });
    };

    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: Sign Up :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Sign Up Page" />
            </Helmet>
            <div>
                <Banner banner_title={"Sign Up"} bannerImg={bannerImg} />
            </div>
            <div className="container mx-auto my-28">
                <div>
                    <h2 className=" text-3xl font-courgette text-center text-orange-500 ">Sign Up for FlavorFusion</h2>
                    <p className=" text-center text-black dark:text-slate-400">Join FlavorFusion today to explore a world of culinary delights and enjoy exclusive benefits!</p>
                </div>
                <div className=" border rounded-lg p-14 my-8 ">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                            <div className="firstName">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input name="firstName" type="text" placeholder="First Name" className="input input-bordered w-full" />
                            </div>
                            <div className="lastName">
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input name="lastName" type="text" placeholder="Last Name" className="input input-bordered w-full" />
                            </div>
                        </div>
                        {/* Photo Url */}
                        <div className="Email">
                            <div className="label">
                                <span className="label-text">Photo Url</span>
                            </div>
                            <input name="photoUrl" type="text" placeholder="Drop your photo URL" className="input input-bordered w-full" />
                        </div>
                        {/* Email */}
                        <div className="Email">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input name="email" type="email" placeholder="your-email@mail-server.com" className="input input-bordered w-full" />
                        </div>
                        {/* Password */}
                        <div className="Password">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input name="password" type="password" placeholder="Drop Your Password" className="input input-bordered w-full" />
                            <div className="flex items-center">
                                {passwordStatus.number ? <FaCheck className="text-green-500 mr-1" /> : <FaTimes className="text-red-500 mr-1" />}
                                1 number
                            </div>
                            <div className="flex items-center">
                                {passwordStatus.uppercase ? <FaCheck className="text-green-500 mr-1" /> : <FaTimes className="text-red-500 mr-1" />}
                                1 uppercase
                            </div>
                            <div className="flex items-center">
                                {passwordStatus.lowercase ? <FaCheck className="text-green-500 mr-1" /> : <FaTimes className="text-red-500 mr-1" />}
                                1 lowercase
                            </div>
                            <div className="flex items-center">
                                {passwordStatus.length ? <FaCheck className="text-green-500 mr-1" /> : <FaTimes className="text-red-500 mr-1" />}
                                6 characters
                            </div>
                            {passwordError && <p className="text-red-500">{passwordError}</p>}
                        </div>
                        <button className="btn btn-outline w-full bg-black">Sign Up</button>
                        <div>
                            <p className="text-center text-black dark:text-slate-400">Already have an account? <a href="/signin" className="text-orange-500">Sign In</a></p>
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

export default SignUp;