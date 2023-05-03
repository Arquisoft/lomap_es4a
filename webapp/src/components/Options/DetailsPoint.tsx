import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel, { MyImage } from "./Carousel";
import {

  Box, Button,
  Collapse,
  createTheme, 
  IconButton,
  ListItemButton,
  ThemeProvider, Typography,
} from '@mui/material';
import TextField from "@mui/material/TextField";

// CSS
import "./Option.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useEffect, useState} from "react";
import ImageUploader from './ImageUploader';
import Review from '../../solidapi/Review';
import {FOAF} from "@inrupt/vocab-common-rdf";
import {CombinedDataProvider, Text} from "@inrupt/solid-ui-react";

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#101F33",
          color: "white"
        }
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

export const ImageViewer = ({ image, onClose }: { image: MyImage; onClose: () => void }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
    data-testid="image-viewer"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:9999
      }}
      onClick={handleClick}
    >
      <div style={{ maxWidth: "80vw", maxHeight: "80vh" }}>
        <img src={image.src} alt={image.alt} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

function DetailsPoint({ open, onClose, point, markerList, addImage, addReview}: any) {
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [images, setImages] = useState<MyImage[]>([]);
  const [, setReviews] = useState<Review[]>([]);
  const [imagesOpen, setImagesOpen] = React.useState(false);
  const [comment, setComment] = useState("");
  const [commentsOpen, setCommentsOpen] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  //const [author,setAuthor]=React.useState<string>()

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedImageIndex(null);
  };

  const handleImageUpload = (image: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      addImage(image,point)
      //ponerImagenes()
    };
    reader.readAsDataURL(image);
  };

  const handleCommentsSubmenu = () => {
    setCommentsOpen(!commentsOpen);
  };

  const handleImagesSubmenu = () => {
    setImagesOpen(!imagesOpen);
  };

  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleAddReview = () => {
    if (comment.trim() !== "" && ratingValue !== null) {
      addReview(comment, ratingValue);
      setComment("");
      setRatingValue(0);
    }
  };
  const ponerImagenes=()=>{
    if (point.logo) {
      let l:any=point.logo.map((imageUrl:string) => {          
        return {
            src: imageUrl,
            alt: "Image stored at " + imageUrl
        };          
      });
      setImages(l)
    }
  }
 

  useEffect(() => {
      ponerImagenes();
      setReviews(point.review)
      // eslint-disable-next-line
  }, [point]);

  const renderReviews=()=> {
    return (
      <List sx={{ mt: 2 }}>
        {point.review ?point.review.map((review:Review) => (
          
          <Box key={review.datePublished}>
            <Rating name="read-only" value={review.reviewRating.score} readOnly />
            <ListItem>
              <Typography variant="body1" color="textPrimary">
                  {"[ "}
                  <CombinedDataProvider
                      datasetUrl={review.author.identifier}
                      thingUrl={review.author.identifier}>
                      {FOAF.name !== null && FOAF.name !== undefined ?
                          (<Text property={FOAF.name}/>)
                          : (<Typography>User</Typography>)}
                  </CombinedDataProvider>
                  {" ] : "} {review.reviewBody}
              </Typography>
            </ListItem>
          </Box>
        )) : ""}
      </List>
    );
  }

  return (
      <ThemeProvider theme={theme}>
        <Drawer anchor="left" open={open} onClose={onClose} >
          <List sx={{ width:'20em' }} disablePadding>
            <ListItem>
              <IconButton data-testid="detailsCloseButton" onClick={onClose}>
                <ChevronLeftIcon sx={{color: "white"}} />
              </IconButton>
              <ListItemText primary="Place's Details" />
            </ListItem>
            <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
            <ListItem>
            <ThemeProvider theme={darkTheme}>
            <Typography variant="subtitle1" color="textPrimary">Place's details:</Typography>
            </ThemeProvider>
            </ListItem>


            <ThemeProvider theme={darkTheme}>
                <ListItem>
                  <Typography variant="subtitle1" color="textPrimary">Point's name:</Typography>
                  <Typography data-testid="nameField" id="details-point-name" variant="body1" color="textSecondary" sx={{pl:'1em'}}>{point.name}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" color="textPrimary">Point's description:</Typography>
                  <Typography data-testid="descField" variant="body1" color="textSecondary" sx={{pl:'1em'}}>{point.description}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" color="textPrimary" >Point's category:</Typography>
                  <Typography data-testid="catField" variant="body1" color="textSecondary" sx={{pl:'1em'}}>{point.category}</Typography>
                </ListItem>
                  <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
                  <ListItemButton data-testid="openImages" onClick={handleImagesSubmenu}>
                        <ListItemText primary="Point's images" />
                        <IconButton  >
                                      <ExpandMoreIcon sx={{color: "#808b96"}}/>
                            </IconButton>
                  </ListItemButton>

                  <Collapse data-testid="imagesCollapse" in={imagesOpen} timeout="auto" unmountOnExit>
                  <ListItem data-testid="uploader">
                    <ImageUploader onImageUpload={handleImageUpload} />
                  </ListItem>

                  {images &&images.length > 0 && (
                     <ListItem>
                      <Carousel data-testid="carousel" images={images} onImageClick={handleImageClick} />
                      </ListItem>
                  )}
                  {selectedImageIndex !== null && (
                    
                    <ImageViewer image={images[selectedImageIndex]} onClose={handleCloseViewer} />
                  )}
                  


                  </Collapse>
                  

                  <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />

                  <ListItemButton data-testid="openComments" onClick={handleCommentsSubmenu}>
                      <ListItemText primary="Point's comments" />
                      <IconButton  >
                                <ExpandMoreIcon sx={{color: "#808b96"}}/>
                      </IconButton>
                  </ListItemButton>

                  <Collapse in={commentsOpen} timeout="auto" unmountOnExit>
                  <Rating
                    data-testid="rating"
                    name="simple-controlled"
                    sx={{pl:'1rem'}}
                    value={ratingValue}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}/>
                  <ListItem style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <TextField
                    data-testid="commentfield"
                    id="comment"
                    label="Add a comment"
                    variant="outlined"
                    value={comment}
                    onChange={handleCommentChange}
                    fullWidth
                    margin="normal"
                    style={{ flex: 1 }}
                  />
                   
                  <Button data-testid="addReview" variant="contained" onClick={handleAddReview} style={{ flex: 'none' }} >
                    Add
                  </Button>
                  </ListItem>
                  
                


                  {renderReviews()}

              </Collapse>

          </ThemeProvider>



           
            {/* Imágenes */}
            {/* Valoraciones */}
          </List>
        </Drawer>

        
      </ThemeProvider>
  );
}

export default DetailsPoint;
