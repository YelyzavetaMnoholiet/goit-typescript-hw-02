import { useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

type Image = {
  id: string;
  urls: {
    regular: string;
  };
  alt_description?: string;
  user: {
    name: string;
  };
  likes: number;
};

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: Image;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
};

const ImageModal = ({
  isOpen,
  onClose,
  image,
  onNext,
  onPrev,
  isNextDisabled,
  isPrevDisabled,
}: ImageModalProps): JSX.Element => {
  useEffect(() => {
    if (isOpen) {
      // Якщо модальне вікно відкривається, встановлюємо appElement
      ReactModal.setAppElement("#root");
    }
  }, [isOpen]); // Залежність на isOpen, щоб тільки при відкритті модального вікна відбувався виклик

  const handleOverlayClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnEsc={true}
    >
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modalContent}>
          <button
            onClick={onPrev}
            className={`${styles.navigationButton} ${styles.previousButton}`}
            disabled={isPrevDisabled}
          >
            Back
          </button>
          <img
            className={styles.modalImage}
            src={image.urls.regular}
            alt={image.alt_description || "Image"}
          />
          <button
            onClick={onNext}
            className={`${styles.navigationButton} ${styles.nextButton}`}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </div>
        <div className={styles.modalInfo}>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </div>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
