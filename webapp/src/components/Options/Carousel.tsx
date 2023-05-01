
export type MyImage ={
    src: string;
    alt: string;
  }


  
  
  interface CarouselProps {
    images: MyImage[];
    onImageClick: (index: number) => void;
  }
  
  const Carousel = ({ images, onImageClick }: CarouselProps) => {
    return (
      <div data-testid="carousel">
        {images.map((image, index) => (
          <img data-testid={image.src}
            key={index}
            src={image.src}
            alt={image.alt}
            width="50"
            height="50"
            style={{ marginRight: "5px", cursor: "pointer" }}
            onClick={() => onImageClick(index)}
          />
        ))}
      </div>
    );
  };
  

export default Carousel;
