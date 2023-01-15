import React from 'react';
import PropTypes from 'prop-types';
import { LoadButton, Wrapper } from './Button.styled';


export const Button = ({ onClick }) => {
  return (
    <Wrapper>
      <LoadButton type="button" onClick={onClick}>
        Load More
      </LoadButton>
    </Wrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};