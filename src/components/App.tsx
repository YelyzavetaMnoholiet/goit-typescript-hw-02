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
import Modal from "react-modal";

export type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  user: {
    name: string;
  };
  likes: number;
};

const App = (): JSX.Element => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const BASE_URL = "https://api.unsplash.com/search/photos";

  const fetchImages = async (): Promise<void> => {
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

  // Виклик setAppElement в App.tsx
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = (): void => setPage((prev) => prev + 1);

  const handleImageClick = (image: Image, index: number): void => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const handleNextImage = (): void => {
    if (currentIndex !== null && currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => (prevIndex !== null ? prevIndex + 1 : 0));
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  const handlePrevImage = (): void => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : 0));
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
