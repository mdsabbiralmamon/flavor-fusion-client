import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import "./Navbar.css"

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-foods">All Foods</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
        </>
    );

    const handleLogOut = () => {
        logoutUser()
            .then(() => {
                console.log("User logged out");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <>
            <div className="glass navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a href="/" className="btn btn-ghost text-xl font-courgette ">Flavor Fusion</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        // User is logged in
                        <div className="relative">
                            <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" onClick={toggleProfileMenu} />
                            {showProfileMenu && (
                                <div className="absolute top-12 right-0 z-10 menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <button className="block w-full px-4 py-2 text-left">{user.displayName}</button>
                                    <NavLink to="/my-orders" className="block w-full px-4 py-2 text-left">My ordered foods</NavLink>
                                    <NavLink to="/add-foods" className="block w-full px-4 py-2 text-left">Add food items</NavLink>
                                    <NavLink to={`/my-foods/${user.email}`} className="block w-full px-4 py-2 text-left">My foods items</NavLink>
                                    <button onClick={handleLogOut} className="block w-full px-4 py-2 text-left">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // User is not logged in
                        <>
                            <NavLink to="/signin" className="btn">Sign In</NavLink>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
