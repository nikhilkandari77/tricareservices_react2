import React from 'react';
import {
    CarouselControl,
    Carousel,
    CarouselItem,
    CarouselIndicators,
  } from 'reactstrap';
import baseUrl from '../../../utils/baseUrl';
  
  const ImageSlide = () => {
    const items = [
      {
        src: '/assets/icons/delete_icon.png',
        altText: 'Image 1',
        caption: 'Caption 1'
      },
      {
        src: '/assets/icons/delete_icon.png',
        altText: 'Image 2',
        caption: 'Caption 2'
      },
      // Add more items as needed
    ];
    
    return (
      <Carousel>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            {/* <img src={`${baseUrl}/resources/products/${id}/${item}`} alt={item} /> */}
            <img src={item.src} alt={item.altText} />

          </CarouselItem>
        ))}
        <CarouselControl direction="prev" />
        <CarouselControl direction="next" />
      </Carousel>
    );
  };
  
  export default ImageSlide;