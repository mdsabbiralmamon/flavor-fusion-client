import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <Helmet>
                <title>Flavor Fusion :: Error 404 :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Page not found" />
            </Helmet>
            <div>
                <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We can’t find that page</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn{"'"}t exist or has been moved.</p>

                <div className="flex items-center mt-6 gap-x-3">
                    <Link to="/"><button className="flex items-center text-nowrap justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span className=" text-nowrap ">Back</span>
                    </button>
                    </Link>

                    <Link
                        to={".."}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    > {" "}<button className="px-5 py-2 text-nowrap text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;