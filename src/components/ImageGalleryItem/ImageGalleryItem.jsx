import ImageGalleryItemStyled from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageTag, setImageTag] = useState('');

  const openModal = event => {
    setImageUrl(event.target.getAttribute('data-url'));
    setImageTag(event.target.getAttribute('data-tag'));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {images.map(image => (
        <ImageGalleryItemStyled key={image.id}>
          {isModalOpen && (
            <Modal
              closeModal={closeModal}
              image={imageUrl}
              imageTag={imageTag}
            />
          )}

          <img
            className="galleryImg"
            src={image.webformatURL}
            alt={image.tags}
            data-tag={image.tags}
            data-url={image.largeImageURL}
            onClick={openModal}
          />
        </ImageGalleryItemStyled>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default ImageGalleryItem;
