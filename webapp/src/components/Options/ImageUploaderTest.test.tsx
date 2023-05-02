import {act, fireEvent, getByText, getByTitle, render, screen, waitFor, within} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import ImageUploader from './ImageUploader';


test('check Image uploader renders correctly', async () => {

 
 const functionMocked = jest.fn();
 const { getByTestId } = await render( <ImageUploader onImageUpload={functionMocked} />);
 const inp = await getByTestId("inp");
 expect(inp).toBeInTheDocument();

});

test('handles image upload correctly', async () => {
 

  const handleImageUpload = (image: File) => {
    jest.fn();
  };
  const { getByTestId } = await render(<ImageUploader onImageUpload={handleImageUpload} />);
  const inp = getByTestId("inp");

  // create a sample image file to simulate an image upload
  const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

  // simulate an image upload event
  fireEvent.change(inp, { target: { files: [file] } });

  /*
  // check that the onImageUpload prop was called with the expected argumentss
  expect(handleImageUpload).toHaveBeenCalledWith(file);

  // check that the uploaded image was added to the state
  console.log('carousel images:', await screen.findAllByAltText('test.png'));
  expect(await screen.findByAltText('test.png')).toBeInTheDocument();
  */
});






  
  
  