import logo from "../../assets/images/logo.png";
const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3">
                <div>
                    <aside>
                        <img className=" h-32 " src={logo} alt="Flavour Fusion Logo" />
                        <p> <span className="text-xl font-courgette">Flavour Fusions <sup>TM</sup></span><br />Indulge in Culinary Excellence, <br /> Create Memories with FlavorFusion.</p>
                    </aside>
                </div>
                <div>
                        <h6 className="footer-title my-4">Services</h6>
                        <p className="link link-hover">Branding</p>
                        <p className="link link-hover">Design</p>
                        <p className="link link-hover">Marketing</p>
                        <p className="link link-hover">Advertisement</p>
                </div>
                <div>
                    <nav>
                        <h2 className=" my-4">Get insider access to our company by subscribing to our newsletter and stay informed about our products, services, and initiatives.</h2>
                        <div className="join">
                            <input className="input input-bordered join-item" placeholder="Email" />
                            <button className="btn join-item bg-orange-500 text-white font-bold rounded-r-full">Subscribe</button>
                        </div>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;