import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../UI/carousel"; // Adjust path as needed

import { Card, CardContent } from "../UI/Card";
import { Button } from "../UI/button";

// Local image imports
import dubaiImg from "../../assets/dubai.png";
import tajImg from "../../assets/taj mahal.png";
import saudi from "../../assets/saudi.png";
import himalaya from "../../assets/himalaya.png";

const promotions = [
  {
    title: "Dreamy Dubai Getaway",
    description: "Experience the magic of Dubai with our exclusive package deals.",
    image: dubaiImg,
    hint: "dubai city",
    buttonText: "Explore Deals",
  },
  {
    title: "Himalayan Adventure Awaits",
    description: "Discover the breathtaking beauty of the Himalayas.",
    image: himalaya,
    hint: "himalayas mountains",
    buttonText: "Book Now",
  },
  {
    title: "Saudi Sands Expedition",
    description: "Explore the rich history and vast deserts of Saudi Arabia.",
    image: saudi,
    hint: "saudi desert",
    buttonText: "Discover More",
  },
  {
    title: "Incredible India Tour",
    description: "From the Taj Mahal to the backwaters of Kerala, find your perfect trip.",
    image: tajImg,
    hint: "taj mahal",
    buttonText: "See Packages",
  },
];

function PromoCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full relative"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {promotions.map((promo, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="relative flex aspect-[3/2] items-end justify-center p-0">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    data-ai-hint={promo.hint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="relative z-10 p-6 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                    <p className="text-sm mb-4">{promo.description}</p>
                    <Button variant="secondary">{promo.buttonText}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}

export default PromoCarousel;
