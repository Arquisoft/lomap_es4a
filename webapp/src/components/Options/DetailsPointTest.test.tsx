import {fireEvent, getByText, getByTitle, render, screen, waitFor, within} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import AddPoint from './AddPoint';
import MainPage from "../MainPage";
import {Session} from "@inrupt/solid-client-authn-browser";
import {wait} from "@testing-library/user-event/dist/utils";
import {act} from "react-dom/test-utils";
import {User} from "../../shared/shareddtypes";
import * as solidapi from "../../solidapi/solidapi";
import Point from "../../solidapi/Point";
import Mapa from '../Map/Map';
import DetailsPoint, { ImageViewer } from './DetailsPoint';
import { MyImage } from './Carousel';
import ImageUploader from './ImageUploader';



test('close DetailsPoint clicking the close button', async () => {

   let open = true;
    const close = () => {
        open = false;
    };
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<DetailsPoint open={true} onClose={close} point={functionMocked}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
  const button = getByTestId("detailsCloseButton");
  fireEvent.click(button);
  expect(open).toBeFalsy();
  
});

test('opening certain point\' s details', async () => {

    const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
    const functionMocked = jest.fn();
    const { getByTestId } = await render(<DetailsPoint open={true} onClose={functionMocked} point={testPoint}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
    const nameField = getByTestId("nameField");
    const descField = getByTestId("descField");
    const catField = getByTestId("catField");
    expect(descField.textContent).toBe("noDesc");
    expect(catField.textContent).toBe("Bar");
 
});

test('opening certain point\' s reviews', async () => {

  const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<DetailsPoint open={true} onClose={functionMocked} point={testPoint}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
  const openComments = getByTestId("openComments");
  fireEvent.click(openComments);
  const rating = getByTestId("rating");
  expect(rating).toBeInTheDocument();

});

test('opening certain point\' s reviews adn adding one', async () => {

  const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<DetailsPoint open={true} onClose={functionMocked} point={testPoint}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
  const openComments = getByTestId("openComments");
  fireEvent.click(openComments);
  const rating = getByTestId("rating");
  expect(rating).toBeInTheDocument();
/*
  fireEvent.change(rating, { target: { value: 3 } });
  expect(rating).toHaveValue(3);
*/
  const commentfield = getByTestId("commentfield");
  expect(commentfield).toBeInTheDocument();
  const input = within(commentfield).getByRole("textbox");
  fireEvent.change(input, { target: { value: "comentario de prueba" } });
  
  expect(input).toHaveValue("comentario de prueba");

  const addReview = getByTestId("addReview");
  expect(addReview).toBeInTheDocument();
  fireEvent.click(addReview);
});

test('opening certain point\' s images', async () => {

  const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<DetailsPoint open={true} onClose={functionMocked} point={testPoint}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
  const openImages = getByTestId("openImages");
  fireEvent.click(openImages);

  const imagesCollapse = getByTestId("imagesCollapse");
  expect(imagesCollapse).toBeInTheDocument();

  const uploader = getByTestId("uploader");
  expect(uploader).toBeInTheDocument();
  

});


test('opening certain point\' s images and try to upload', async () => {

  const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<DetailsPoint open={true} onClose={functionMocked} point={testPoint}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
  const openImages = getByTestId("openImages");
  fireEvent.click(openImages);

  const imagesCollapse = getByTestId("imagesCollapse");
  expect(imagesCollapse).toBeInTheDocument();

  const uploader = getByTestId("uploader");
  expect(uploader).toBeInTheDocument();

  // Simulate image upload
  const imageFile = new File(['(⌐□_□)'], 'test-image.png', { type: 'image/png' });
  fireEvent.change(uploader, { target: { files: [imageFile] } });


});

test('render Image viewer and clic', async () => {
  let open = true;
  const close = () => {
      open = false;
  };
  const image: MyImage = { src: 'http://example.com/image.jpg', alt: 'Test image' };
  const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<ImageViewer image={image} onClose={close} />);
  const viewer = getByTestId('image-viewer');
  fireEvent.click(viewer);

  expect(open).toBe(false);
  

});

/*
test('render ImageUploader viewer and clic', async () => {
  const onImageUpload = jest.fn();
  const { getByTestId } = render(<ImageUploader onImageUpload={onImageUpload} />);

  const file = new File(['(⌐□_□)'], 'test-image.png', { type: 'image/png' });
  const input = getByTestId('uploader');
  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => expect(onImageUpload).toHaveBeenCalledWith(file));
  

});
*/



 


  
  
  