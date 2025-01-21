import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../context";
import { IoClose } from "react-icons/io5";

const PostDetail = () => {
  const {
    isPostDetailOpen,
    closePostDetail,
    postToShow,
    deletePost,
    updatePost,
  } = useContext(PostContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(postToShow);

  // Sincronizar `editedPost` cuando cambie `postToShow`
  useEffect(() => {
    setEditedPost(postToShow);
  }, [postToShow]);

  // Manejar eliminación de post
  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `https://678f665749875e5a1a91acb8.mockapi.io/photo/${postToShow.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        deletePost(postToShow.id);
        alert("Post deleted successfully!");
        closePostDetail();
        window.location.reload(); // Recargar página tras eliminación
      } else {
        alert("Error deleting the post");
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
      alert("There was an error deleting the post");
    }
  };

  // Manejar edición de post
  const handleEditPost = async () => {
    try {
      const response = await fetch(
        `https://678f665749875e5a1a91acb8.mockapi.io/photo/${postToShow.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedPost),
        }
      );

      if (response.ok) {
        updatePost(editedPost);
        alert("Post updated successfully!");
        setIsEditing(false);
        window.location.reload(); // Recargar página tras edición
      } else {
        alert("Error updating the post");
      }
    } catch (error) {
      console.error("Error updating the post:", error);
      alert("There was an error updating the post");
    }
  };

  // Actualizar datos del post editado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <aside
      className={`${
        isPostDetailOpen ? "flex" : "hidden"
      } fixed inset-0 z-40 items-center justify-center bg-black/50 backdrop-blur-sm`}
    >
      <div
        className="relative w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-6">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Post" : "Post Details"}
          </h2>
          <button
            className="p-2 bg-gray-200 text-xl rounded-full hover:bg-gray-300"
            onClick={closePostDetail}
          >
            <IoClose />
          </button>
        </div>

        {/* Content */}
        {isEditing ? (
          <form className="grid gap-4">
            <input
              type="text"
              name="title"
              value={editedPost?.title || ""}
              placeholder="Title"
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              name="description"
              value={editedPost?.description || ""}
              placeholder="Description"
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
            />
            <textarea
              name="info"
              value={editedPost?.info || ""}
              placeholder="Information"
              onChange={handleChange}
              className="w-full p-4 border rounded-lg h-32"
            />
            <input
              type="text"
              name="image"
              value={editedPost?.image || ""}
              placeholder="Image URL"
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={handleEditPost}
              >
                Save
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid gap-6">
            <img
              src={postToShow?.image}
              alt={postToShow?.title}
              className="w-full rounded-lg"
            />
            <h3 className="text-xl font-bold">{postToShow?.title}</h3>
            <p className="text-gray-500">{postToShow?.info}</p>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default PostDetail;
