import { Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import {getImages} from '../../services/imageApi';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import {Modal} from '../Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    currentImage: null,
    status: "idle",
  };

  componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    if (prevState.page !== page || prevState.search !== search) {
      if (search !== '') {
        this.fetchData({ page, search });
      }
    }
  }
  handleFormSubmit = search => {
    if (search === '') {
      toast.error('Please enter key word', {
        position: toast.POSITION.TOP_CENTER
      });
    }
    this.setState({
      images: [],
      search,
      page: 1,
    });
  };

  fetchData = async ({ page = this.state.page, search = '' }) => {
    this.setState({ status: "pending" });

    try {
      const data = await getImages({ page, search });
      this.handleResolve(data);
    } catch (error) {
      this.setState({ status: "rejected" });
      console.log(error);
    }
  };

  handleResolve = ({ hits, total, totalHits }) => {
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
      this.setState({ status: "idle" });
      return;
    }

    if (totalHits < this.state.page * 12) {
      this.setState(({ images }) => ({
        images: [...images, ...sortedImages],
        status: "idle",
      }));
      toast.info(
        "We're sorry, but you've reached the end of search results", {
          position: toast.POSITION.TOP_RIGHT
        });
      return;
    }

    this.setState(({ images }) => ({
      images: [...images, ...sortedImages],
      status: "resolved",
    }));
    if (this.state.page === 1) {
      toast.success(`We've found images as per your request`, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
   };
  
  openModal = image => {
    this.setState({ currentImage: image });
  };
  
  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { images, status, currentImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.openModal} />
        )}
        {images.length > 0 && status === "resolved" && (
          <Button onClick={this.handleLoadMore} />
        )}

        {status === "pending"  && <Loader />}
        
        {currentImage && (
          <Modal image={currentImage} onClose={this.closeModal} />
        )}
        <ToastContainer autoClose={3000} theme="colored"/>
        </div>
    );
  }
}

