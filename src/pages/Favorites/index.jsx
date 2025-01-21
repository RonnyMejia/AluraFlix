import { useContext } from "react";
import { PostContext } from "../../context";
import { IoHeartSharp } from "react-icons/io5";
import Layout from "../../components/Layout";

const Favorites = () => {
    const { postFavorites, setPostFavorites } = useContext(PostContext);

    const removeFavorite = (e, post) => {
        e.stopPropagation();
        const updatedFavorites = postFavorites.filter(
            (favPost) => favPost.id !== post.id
        );
        setPostFavorites(updatedFavorites);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white py-20 shadow-lg">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-5xl font-bold mb-4">Your Favorite Images</h2>
                    <p className="text-lg font-light">
                        Explore your curated collection of favorite images.
                    </p>
                </div>
            </section>

            {/* Favorites List */}
            <section className="py-14 bg-gray-50">
                <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {postFavorites.length > 0 ? (
                        postFavorites.map((data, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
                            >
                                <figure className="relative">
                                    <img
                                        className="w-full h-56 object-cover rounded-t-lg"
                                        src={data.image}
                                        alt={data.title}
                                    />
                                    <button
                                        className="absolute top-4 right-4 bg-white border border-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-xl text-red-500 hover:bg-red-100 transition-all"
                                        onClick={(e) => removeFavorite(e, data)}
                                        aria-label="Remove from favorites"
                                    >
                                        <IoHeartSharp />
                                    </button>
                                </figure>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 truncate mb-3">
                                        {data.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 text-lg">
                            No favorites added yet.
                        </p>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Favorites;
