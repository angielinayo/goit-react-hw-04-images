import axios from 'axios';
import PropTypes from 'prop-types';

export const queryPixabayAPI = async (query, page) => {
  const params = {
    q: query,
    page: page,
    key: '33208131-4d6357c90f666897a60a05f72',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  };

  const { data } = await axios.get('https://pixabay.com/api/', { params });
  return data;
};

queryPixabayAPI.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
