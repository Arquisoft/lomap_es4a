import { useState } from "react";
import { MyImage } from "./Carousel";

interface ImageUploaderProps {
  onImageUpload: (image: File) => void;
}




const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [carouselImages, setCarouselImages] = useState<MyImage[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setCarouselImages((prevImages) => [
        ...prevImages,
        { src: URL.createObjectURL(file), alt: file.name },
      ]);
      onImageUpload(file);
    }
  };

  

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      
    </div>
  );
};
export default ImageUploader;