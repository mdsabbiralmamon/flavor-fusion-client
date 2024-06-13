import PropTypes from 'prop-types'


const PhotoGalleryCard = ({photo}) => {
    const {photoUrl, feedback, userName} = photo;
    return (
        <div className="relative bg-base-100 shadow-xl image-full overflow-hidden rounded-lg">
            <figure className="relative">
                <img src={photoUrl} alt="food image" className='w-full'/>
            </figure>
            <div className="absolute inset-0 flex items-center justify-center group">
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
                <div className="card-body text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h2 className="card-title">Submitted: {" "} {userName}</h2>
                    <h2 className=" card-title text-sm ">Feedback:{" "} {feedback}</h2>
                </div>
            </div>
        </div>
    );
};

PhotoGalleryCard.propTypes = {
    photo: PropTypes.object,
};

export default PhotoGalleryCard;
