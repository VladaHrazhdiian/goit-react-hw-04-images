import axios from "axios";

const KEY = '38110026-5bfbf894cc748013b74eb0441';
const URL = 'https://pixabay.com/api/';

const getImages = async (searchQuery, page) => {
    const responce = await axios.get(URL, {
        params: {
            q: searchQuery,
            key: KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page,

        },
    });
    return responce.data;
};

export default getImages;

