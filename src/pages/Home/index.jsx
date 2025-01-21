import { useContext } from "react";
import { PostContext } from "../../context";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import PostDetail from "../../components/PostDetail";

const Home = () => {
    const context = useContext(PostContext);

    const renderView = () => {
        const itemsToRender =
            context.filteredItems?.length > 0 ? context.filteredItems : context.items;

        if (itemsToRender?.length > 0) {
            return itemsToRender.map((item) => <Card key={item.id} data={item} />);
        } else {
            return (
                <div className="text-center w-full text-gray-500 text-lg font-bold">
                    No Images Found
                </div>
            );
        }
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-20 text-center">
                <div className="container mx-auto px-5">
                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
                        Welcome to PixaPhotos
                    </h1>
                    <p className="text-lg lg:text-2xl font-light">
                        Discover inspiring images.
                    </p>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-5">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-6">
                        <input
                            type="text"
                            placeholder="Search for images"
                            className="rounded-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-full md:w-[500px] py-3 px-6 shadow-md"
                            onChange={(event) =>
                                context.setSearchByTitle(event.target.value)
                            }
                        />
                    </div>
                </div>
            </section>

            {/* Post Cards */}
            <section className="py-10">
                <div className="container mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {renderView()}
                </div>
            </section>

            {/* Post Detail */}
            <PostDetail />
        </Layout>
    );
};

export default Home;
