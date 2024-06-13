import { Helmet } from "react-helmet";
import Slider from "../../components/Slider/Slider";
import OurStory from "./OurStory";
import Reservation from "./Reservation";
import TopFoods from "./TopFoods";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Flavor Fusion :: Home :: </title>
                <meta name="Flavor Fusion" content="Flavor Fusion Food Review App - Home Page" />
            </Helmet>
            <Slider />
            <div className="container mx-auto my-24">
                <OurStory />
            </div>
            <div className="mb-24">
                <TopFoods />
            </div>
            <div className="container mx-auto my-24">
                <Reservation />
            </div>
        </div>
    );
};

export default Home;