import PropTypes from 'prop-types'

const Banner = (props) => {
    const {banner_title, bannerImg} = props;
    const bannerStyle = {
        backgroundImage: `linear-gradient(180deg, rgba(3, 7, 18, 0.90) 0%, rgba(3, 7, 18, 0.50) 100%), url(${bannerImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div>
            <h2 className='h-[545px] text-white dark:text-slate-400  flex justify-center items-center text-5xl font-extrabold' style={bannerStyle}>{banner_title}</h2>
        </div>
    );
};

Banner.propTypes = {
    banner_title: PropTypes.string,
    bannerImg: PropTypes.string,
};

export default Banner;