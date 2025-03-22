import { Image } from "../App";

type ImageCardProps = {
  image: Image;
  onClick: () => void;
};

const ImageCard = ({ image, onClick }: ImageCardProps): JSX.Element => {
  return (
    <div onClick={onClick}>
      <img src={image.urls.small} alt={image.alt_description || "Image"} />
    </div>
  );
};

export default ImageCard;
