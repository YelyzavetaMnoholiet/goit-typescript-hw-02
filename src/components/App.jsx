import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import { API_KEY } from "../config/config";
import styles from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const BASE_URL = "https://api.unsplash.com/search/photos";

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(BASE_URL, {
        params: { query, page, per_page: 12 },
        headers: { Authorization: `Client-ID ${API_KEY}` },
      });
      setImages((prev) => [...prev, ...data.results]);
    } catch (err) {
      console.error(err);
      setError("Failed to load images.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Image Gallery</h1>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeModal}
          image={selectedImage}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          isNextDisabled={currentIndex === images.length - 1}
          isPrevDisabled={currentIndex === 0}
        />
      )}
    </div>
  );
};

export default App;
