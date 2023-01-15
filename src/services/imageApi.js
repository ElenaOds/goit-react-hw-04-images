import axios from "axios";


const imagesApi = axios.create({
  baseURL: 'https://pixabay.com/',
});

export const getImages = async ({ page, search } = {}) => {
  const { data } = await imagesApi.get(`api/`, {
    params: {
      key: '31476924-d929541eaee183828a9c10824',
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      q: search,
    },
  });

  return data;
};

