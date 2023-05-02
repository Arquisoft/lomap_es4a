import { useState } from "react";
import { MyImage } from "./Carousel";

interface ImageUploaderProps {
  onImageUpload: (image: File) => void;
}




const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [, setImage] = useState<File | null>(null);
  const [, setCarouselImages] = useState<MyImage[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {  onImageUpload(file);
      };
    }
  };
  
  

  return (
    <div>
      <input data-testid="inp" type="file" onChange={handleImageChange} />
      
    </div>
  );
};
export default ImageUploader;