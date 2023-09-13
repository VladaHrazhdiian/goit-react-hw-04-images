import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ hit }) => {
  const [showModal, setShowModal] = useState(false);
  const { largeImageURL, webformatURL, tags } = hit;

  return (
    <>
      <ImageItem onClick={() => setShowModal(showModal => !showModal)}>
        <Image src={webformatURL} alt={tags} loading="lazy" />
      </ImageItem>
      {showModal && (
        <Modal
          toggleModal={() => setShowModal(showModal => !showModal)}
          imageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};