import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel, { MyImage } from "./Carousel";
import {

  Autocomplete, Avatar, Box, Button,
  Collapse,
  createTheme, Dialog, DialogActions, DialogContent,
  IconButton,
  ListItemButton,
  ThemeProvider, Typography,
} from '@mui/material';
import TextField from "@mui/material/TextField";

// CSS
import "./Option.css";
import Point from "../../solidapi/Point";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {ChangeEvent, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import ImageUploader from './ImageUploader';
import Author from '../../solidapi/Author';
import { reviewRating } from 'rdf-namespaces/dist/schema';
import Review from '../../solidapi/Review';

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

function DetailsPoint({ open, onClose, point, markerList,addImage,addReview}: any) {
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [images, setImages] = useState<MyImage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [imagesOpen, setImagesOpen] = React.useState(false);
  const [comment, setComment] = useState("");
  const [commentsOpen, setCommentsOpen] = React.useState(false);
  const [commentsList, setCommentsList] = useState<string[]>([]);
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

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setCommentsList([...commentsList, comment]);
      setComment("");
    }
  };

  const handleAddReview = () => {
    if (comment.trim() !== "" && ratingValue !== null) {
      addReview(comment, ratingValue)
      //setAuthor({identifier:"2"  })
      /*
      setReviews([...reviews, { 
        author: "u",
        reviewBody: comment, 
        ratingValue: ratingValue,
      datePublished:Date.now() }]);*/
      setComment("");
      setRatingValue(0);
    }
  };
  const ponerImagenes=()=>{
    console.log(point)
      let l:any=point.logo.map((imageUrl:string) => {
        
        return {
            src: imageUrl,
            alt: "Image stored at " + imageUrl
        };
        
    });
    setImages(l)
  }


  const ponerReviews=()=>{
    console.log(point)
      let l:any=point.review.map((r:Review) => {

        renderReviews()
      });
        
    
    setReviews(l)
  }


  useEffect(() => {
      ponerImagenes();
      //ponerReviews();
      setReviews(point.review)
  }, [point]);

  const renderReviews=()=> {
    return (
      <List sx={{ mt: 2 }}>
        {point.review.map((review:Review) => (
          
          <Box key={review.datePublished}>
            <Rating name="read-only" value={review.reviewRating} readOnly />
            <ListItem>
              <Typography variant="body1" color="textPrimary">
                {review.author} ({review.datePublished}) - {review.reviewBody} - {review.reviewRating}
              </Typography>
            </ListItem>
          </Box>
        ))}
      </List>
    );
  }

  return (
      <ThemeProvider theme={theme}>
        <Drawer anchor="left" open={open} onClose={onClose} >
          <List sx={{ width:'20em' }} disablePadding>
            <ListItem>
              <IconButton onClick={onClose}>
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
                  <Typography variant="body1" color="textSecondary" sx={{pl:'1em'}}>{point.name}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" color="textPrimary">Point's description:</Typography>
                  <Typography variant="body1" color="textSecondary" sx={{pl:'1em'}}>{point.description}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" color="textPrimary" >Point's category:</Typography>
                  <Typography variant="body1" color="textSecondary" sx={{pl:'1em'}}>{point.category}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" color="textPrimary" >Point's icon:</Typography>

                  
                  {point && point.id ? (
                      ""//<Avatar alt="Point Icon" sx={{pl:'1em'}}src={markerList[point.id].icon.url} />
                    ) : (
                  <Typography variant="body1" color="textSecondary" sx={{ pl: "1em" }}>
                    No icon available
                  </Typography>
                  )}
                  </ListItem>
                  <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />

                  <ListItemButton onClick={handleImagesSubmenu}>
                        <ListItemText primary="Point's images" />
                        <IconButton  >
                                      <ExpandMoreIcon sx={{color: "#808b96"}}/>
                            </IconButton>
                  </ListItemButton>

                  <Collapse in={imagesOpen} timeout="auto" unmountOnExit>
                  <ListItem>
                  <ImageUploader onImageUpload={handleImageUpload} />
                  </ListItem>

                  {images &&images.length > 0 && (
                     <ListItem>
                      <Carousel images={images} onImageClick={handleImageClick} />
                      </ListItem>
                  )}
                  {selectedImageIndex !== null && (
                    
                    <ImageViewer image={images[selectedImageIndex]} onClose={handleCloseViewer} />
                  )}
                  


                  </Collapse>

                  <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />

                  <ListItemButton onClick={handleCommentsSubmenu}>
                      <ListItemText primary="Point's comments" />
                      <IconButton  >
                                <ExpandMoreIcon sx={{color: "#808b96"}}/>
                      </IconButton>
                  </ListItemButton>

                  <Collapse in={commentsOpen} timeout="auto" unmountOnExit>
                  <Rating
                    name="simple-controlled"
                    sx={{pl:'1rem'}}
                    value={ratingValue}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}/>
                  <ListItem style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <TextField
                    id="comment"
                    label="Add a comment"
                    variant="outlined"
                    value={comment}
                    onChange={handleCommentChange}
                    fullWidth
                    margin="normal"
                    style={{ flex: 1 }}
                  />
                   
                  <Button variant="contained" onClick={handleAddReview} style={{ flex: 'none' }} >
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
