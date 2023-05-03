import {fireEvent, getByText, getByTitle, render, screen, waitFor, within} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import Point from "../../solidapi/Point";
import DetailsPoint, { ImageViewer } from './DetailsPoint';
import { MyImage } from './Carousel';
let open:boolean;
let testPoint:Point;
beforeEach( () => { 
  open = true;
  const close = () => open = false;
  testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
  const functionMocked = jest.fn();
  const { getByTestId } = render(<DetailsPoint open={true} onClose={close} point={functionMocked}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
});


test('close DetailsPoint clicking the close button', async () => {

   
  
  const button = screen.getByTestId("detailsCloseButton");
  fireEvent.click(button);
  expect(open).toBeFalsy();
  
});

test('opening certain point\' s details', async () => {
  const descField = screen.getByTestId("descField");
  const catField =  screen.getByTestId("catField");
  
  //expect(descField.textContent).toBe("noDesc");
  //expect(catField.textContent).toBe("Bar");

});
test('opening certain point\' s reviews', async () => {

  const openComments = screen.getByTestId("openComments");
  fireEvent.click(openComments);
  const rating = screen.getByTestId("rating");
  expect(rating).toBeInTheDocument();

});

test('opening certain point\' s reviews adn adding one', async () => {

  const openComments = screen.getByTestId("openComments");
  fireEvent.click(openComments);
  const rating = screen.getByTestId("rating");
  expect(rating).toBeInTheDocument();

  const commentfield = screen.getByTestId("commentfield");
  expect(commentfield).toBeInTheDocument();
  const input = within(commentfield).getByRole("textbox");
  fireEvent.change(input, { target: { value: "comentario de prueba" } });
  
  expect(input).toHaveValue("comentario de prueba");

  const addReview = screen.getByTestId("addReview");
  expect(addReview).toBeInTheDocument();
  fireEvent.click(addReview);
});

test('opening certain point\' s images', async () => {

  const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
  const openImages = screen.getByTestId("openImages");
  fireEvent.click(openImages);

  const imagesCollapse = screen.getByTestId("imagesCollapse");
  expect(imagesCollapse).toBeInTheDocument();

  const uploader = screen.getByTestId("uploader");
  expect(uploader).toBeInTheDocument();
  

});


test('opening certain point\' s images and try to upload', async () => {

  const openImages = screen.getByTestId("openImages");
  fireEvent.click(openImages);

  const imagesCollapse = screen.getByTestId("imagesCollapse");
  expect(imagesCollapse).toBeInTheDocument();

  const uploader = screen.getByTestId("uploader");
  expect(uploader).toBeInTheDocument();

  // Simulate image upload
  const imageFile = new File(['(⌐□_□)'], 'test-image.png', { type: 'image/png' });
  fireEvent.change(uploader, { target: { files: [imageFile] } });


});

test('render Image viewer and clic', async () => {
  let open = true;
  const closes = () => {
      open = false;
  };
  const image: MyImage = { src: 'http://example.com/image.jpg', alt: 'Test image' };
  const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<ImageViewer image={image} onClose={closes} />);
  const viewer = getByTestId('image-viewer');
  fireEvent.click(viewer);
  expect(open).toBe(false);
  
});

  
  
  