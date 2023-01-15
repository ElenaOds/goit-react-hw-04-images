import React from 'react';
import PropTypes from 'prop-types';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import {Gallery} from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
    return (
      <Gallery>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            image={largeImageURL}
            onClick={onClick}
          />
        ))}
      </Gallery>
    );
  };
  
  ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    onClick: PropTypes.func.isRequired,
  };