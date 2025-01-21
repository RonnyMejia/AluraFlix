import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { PostContext } from "../../context";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const Card = ({ data }) => {
  const { postFavorites, setPostFavorites, openPostDetail, setPostToShow } =
    useContext(PostContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const isPostFavorite = () =>
    postFavorites.some((post) => post.id === data.id);

  const handlePostDetails = () => {
    openPostDetail();
    setPostToShow(data);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    const updatedFavorites = isFavorite
      ? postFavorites.filter((post) => post.id !== data.id)
      : [...postFavorites, data];
    setPostFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    setIsFavorite(isPostFavorite());
  }, [postFavorites, data.id]);

  return (
    <div
      className="bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
      onClick={handlePostDetails}
    >
      <figure className="relative">
        <img
          className="w-full h-56 object-cover rounded-t-lg"
          src={data.image}
          alt={data.title}
        />
        <button
          className={`absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md transition-all ${
            isFavorite ? "text-red-500 hover:bg-red-100" : "text-gray-500 hover:bg-gray-200"
          }`}
          onClick={handleFavoriteToggle}
          aria-label="Toggle favorite"
        >
          {isFavorite ? <IoHeartSharp size={20} /> : <IoHeartOutline size={20} />}
        </button>
      </figure>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 truncate mb-2">
          {data.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {data.description}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
