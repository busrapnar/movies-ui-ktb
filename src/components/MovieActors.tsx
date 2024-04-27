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
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div className='min-h-screen flex flex-col gap-4 mt-5'>
      <h2 className="text-2xl mt-4">Oyuncular</h2>
      <Slider {...settings}>
      {credits.map((cast) => (
          <div key={cast.id}>
            <Card className='flex flex-col gap-2 w-44 h-48'>
              <img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt="" className='w-full h-32 rounded-t-lg' />
              <CardDescription className='px-1'>{cast.name} - {cast.character}</CardDescription>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};