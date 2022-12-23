import React, {useContext} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { UserProfile } from "./pages/user-profile";
import { Interview } from "./pages/interview";
import { InterviewerProfile } from "./pages/interviewer-profile"
import { Contact } from "./pages/contact"

import { Context } from "./store/appContext"

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";



//create your first component
const Layout = () => {
    const {store, actions} = useContext (Context)
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                <Navbar />
                    <Routes>

                        <Route element={<Home />} path="/" />
                        <Route element={<Login/>} path="/login"/>
                        <Route element={<Interview/>} path="/entrevistas"/>
                        <Route element={<InterviewerProfile/>} path="/entrevistas/:id/:name"/> {/* Este name es el que se relaciona con el Useparams */}
                        {/* <Route element={store.logged ? (<UserProfile />): <Navigate to = "/login"> </Navigate>} path="/user-profile" /> */}
                        <Route element={<UserProfile />} path="/user-profile" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
