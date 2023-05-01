import {fireEvent, getByText, getByTitle, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import Carousel from './Carousel';



test('carousel renders', async () => {

  const functionMocked = jest.fn();
  const { getByTestId } = await render(<Carousel data-testid="carousel" images={[{src: "a", alt: "a"}]} onImageClick={functionMocked} />);
  const c = getByTestId("carousel");
  expect(c).toBeInTheDocument();

  const im = getByTestId("a");
  expect(im).toBeInTheDocument();
  fireEvent.click(im);
  
});









 


  
  
  