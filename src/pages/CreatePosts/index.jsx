import { useState } from "react";
import Layout from "../../components/Layout";

const CreatePosts = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    info: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://678f665749875e5a1a91acb8.mockapi.io/photo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error saving data");
      }

      alert("Created successfully!");

      setFormData({
        title: "",
        description: "",
        info: "",
        image: "",
      });

      // Recargar la página
      window.location.reload();
    } catch (error) {
      alert(error.message || "There was an error with the data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 text-center">
        <h2 className="text-4xl font-extrabold">Create</h2>
        <p className="text-lg mt-2">Share your photos with the world.</p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto mt-12 mb-20 bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <div className="space-y-1">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="info" className="block text-lg font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="info"
            name="info"
            value={formData.info}
            onChange={handleInputChange}
            placeholder="Content"
            required
            className="w-full border border-gray-300 rounded-lg p-3 h-40 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-auto px-6 py-3 text-white font-semibold rounded-lg transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting" : "Create"}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreatePosts;
