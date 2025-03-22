import ImageCard from "./ImageCard";
import { Image } from "../App";
import styles from "./ImageGallery.module.css";

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (image: Image, index: number) => void;
};

const ImageGallery = ({
  images,
  onImageClick,
}: ImageGalleryProps): JSX.Element => {
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
