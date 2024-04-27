import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardDescription } from './ui/card';
import { Credits } from '@/utils/type';

interface MovieActorsProps {
  credits: Credits[];
}

export const MovieActors: React.FC<MovieActorsProps> = ({ credits }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  
  };

  return (
    <div className='min-h-screen flex flex-col gap-4 mt-5 '>
      <h2 className="text-2xl mt-4">Casts</h2>
      <div className='flex flex-col text-accent'>
      <Slider {...settings} className=''>
      {credits.map((cast) => (
          <div key={cast.id}>
            <Card className='flex flex-col justify-between w-52 h-52'>
              <img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt="" className='w-full h-40 rounded-t-lg' />
              <CardDescription className='text-center py-1'>{cast.name} - {cast.character}</CardDescription>
            </Card>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};