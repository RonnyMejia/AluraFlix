import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    // Estados principales
    const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
    const [postToShow, setPostToShow] = useState({});
    const [postFavorites, setPostFavorites] = useState([]);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchByCategory, setSearchByCategory] = useState('');

    // Control del detalle del post
    const openPostDetail = () => setIsPostDetailOpen(true);
    const closePostDetail = () => setIsPostDetailOpen(false);

    // Manejo de favoritos
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('postFavorites')) || [];
        setPostFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem('postFavorites', JSON.stringify(postFavorites));
    }, [postFavorites]);

    const toggleFavorite = (post) => {
        const updatedFavorites = postFavorites.some((favorite) => favorite.id === post.id)
            ? postFavorites.filter((favorite) => favorite.id !== post.id)
            : [...postFavorites, post];

        setPostFavorites(updatedFavorites);
    };

    // Obtener datos de los posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://678f665749875e5a1a91acb8.mockapi.io/photo");
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    // Filtros
    const filterItems = () => {
        let filtered = items;

        if (searchByTitle) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(searchByTitle.toLowerCase())
            );
        }

        if (searchByCategory) {
            filtered = filtered.filter((item) =>
                item.tag?.toLowerCase().includes(searchByCategory.toLowerCase())
            );
        }

        setFilteredItems(filtered);
    };

    useEffect(() => {
        filterItems();
    }, [items, searchByTitle, searchByCategory]);

    // Eliminar un post
    const deletePost = async (id) => {
        try {
            const response = await fetch(`https://678f665749875e5a1a91acb8.mockapi.io/photo/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setItems((prevItems) => prevItems.filter((post) => post.id !== id));
                setFilteredItems((prevFilteredItems) =>
                    prevFilteredItems.filter((post) => post.id !== id)
                );
            } else {
                console.error('Error deleting the post');
            }
        } catch (error) {
            console.error('Error deleting the post:', error);
        }
    };

    // Actualizar un post
    const updatePost = (updatedPost) => {
        setItems((prevItems) =>
            prevItems.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
        setFilteredItems((prevFilteredItems) =>
            prevFilteredItems.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
            )
        );
    };

    return (
        <PostContext.Provider
            value={{
                openPostDetail,
                closePostDetail,
                isPostDetailOpen,
                postToShow,
                setPostToShow,
                postFavorites,
                setPostFavorites,
                toggleFavorite,
                items,
                setItems,
                searchByTitle,
                setSearchByTitle,
                filteredItems,
                searchByCategory,
                setSearchByCategory,
                deletePost,
                updatePost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

PostProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
