import ImageCard from "./ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image, index) => (
        <li key={image.id} className={styles.image}>
          <ImageCard image={image} onClick={() => onImageClick(image, index)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
