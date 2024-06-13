import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // sign in with password authentication
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // sign up with password authentication
    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Update Profile Name and Photo
    const updateUserName = (name) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    };

    const updatePhoto = (photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            photoURL: photo
        });
    };

    // Creating Google Provider for sign in
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // logout function
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // observing user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
            const userEmail = loggedInUser?.email || user?.email;
            const loggedInUserEmail = {email: userEmail};
            console.log("observing", loggedInUser);
            setUser(loggedInUser);
            setLoading(false);
            // issue a token if user exists
            if(loggedInUser){
                axios.post("https://b9a11-server-side-mdsabbiralmamon.vercel.app/jwt", loggedInUserEmail, {withCredentials: true})
                    .then(res => console.log("Token Response",res.data));
            }
            else{
                axios.post("https://b9a11-server-side-mdsabbiralmamon.vercel.app/logout", loggedInUserEmail, {withCredentials: true}).then(res => console.log("Token Response",res.data));
            }
        });
        return () => {
            unSubscribe();
        };
    }, [user]);

    const authInfo = { user, loading, signInUser, signUpUser, logoutUser, googleSignIn, updateUserName, updatePhoto };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;