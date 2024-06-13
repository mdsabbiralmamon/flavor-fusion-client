import PropTypes from 'prop-types'


import "./FoodCard.css"
import { MdCategory } from 'react-icons/md';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
    const { _id, FoodImage, FoodName, FoodCategory, Price } = food;
    // console.log(FoodImage);
    const cardStyle = {
        backgroundImage: `url(${FoodImage})`,
        backgroundSize: 'cover'
    };
    return (
        <div style={cardStyle} className="card w-full">
            <div className="card-content">
                <h2 className="card-title">{FoodName}</h2>
                <div className="card-body">
                    <div className='flex items-center gap-8'>
                        <div>
                            <p><MdCategory /> </p> <p>{FoodCategory}</p>
                        </div>
                        <div>
                            <p><AiOutlineDollarCircle /> </p> <p>{Price}</p>
                        </div>
                    </div>
                </div>
                <Link to={`/foods/${_id}`}>
                    <button className="button font-bold">View Details</button>
                </Link>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    food: PropTypes.object,
}

export default FoodCard;