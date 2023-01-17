import { useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import {getImages} from '../../services/imageApi';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import {Modal} from '../Modal/Modal';

export function App () {
const [search, setSearch] = useState('');
const [images, setImages] = useState([]);
const [page, setPage] = useState(1);
const [currentImage, setCurrentImage] = useState(null);
const [status, setStatus] = useState('idle');

useEffect(() => {
  if (!search) {
    return;
  };

  const fetchData = async ({ page, search = '' }) => {
    setStatus('pending');
   
    try {
      const data = await getImages({page, search});
      handleResolve(data);

    } catch (error) {
      setStatus('rejected');
      console.log(error);
    } 
  };

  const handleResolve = ({ hits, total, totalHits }) => {
    const sortedImages = hits.map(
      ({ id, webformatURL, tags, largeImageURL }) => ({
        id,
        webformatURL,
        tags,
        largeImageURL,
      })
    );

    if (!total) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.', {
          position: toast.POSITION.TOP_RIGHT
        });
        setStatus('idle');
      return;
    }

    if (totalHits < page * 12) {
      setImages(prevImages => [...prevImages, ...sortedImages]);
        setStatus('idle');
            toast.info(
        "We're sorry, but you've reached the end of search results", {
          position: toast.POSITION.TOP_RIGHT
        });
      return;
    }

    setImages(prevImages => [...prevImages, ...sortedImages]);
      setStatus('resolved');

        if (setPage === 1) {
      toast.success(`We've found images as per your request`, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  fetchData({ page, search });

}, [page, search]);


const handleFormSubmit = search => {
  setSearch(search);
  setImages([]);
  setPage(1);
};
    const handleLoadMore = () => {
    setPage (prevPage => prevPage +1)
   };
  
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery 
          images={images} 
          onClick={setCurrentImage} 
          />
        )}
        {images.length > 0 && status === "resolved" && (
          <Button 
          onClick={handleLoadMore} 
          />
        )}

        {status === "pending"  && <Loader />}
        
        {currentImage && (
          <Modal 
          image={currentImage} onClose={setCurrentImage} 
          />
        )}
        <ToastContainer autoClose={3000} theme="colored"/>
        </div>
    );
  }
