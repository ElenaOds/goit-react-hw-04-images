import React from 'react';
import PropTypes from 'prop-types';

import {GalleryItem, GalleryImage} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, alt, image, onClick }) => {
    return (
      <GalleryItem>
        <GalleryImage
          src={src}
          alt={alt}
          onClick={() => onClick({ src: image, alt })}
        />
      </GalleryItem>
    );
  };
  
  ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };