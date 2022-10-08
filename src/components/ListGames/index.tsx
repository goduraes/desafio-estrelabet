import React from 'react';
import { Link } from 'react-router-dom';
import { gameProps } from '../../types'
import { format, parseISO } from 'date-fns';

interface ListGamesProps {
  games: gameProps[] | [];
}

export default ({ games }: ListGamesProps) => {

  const formatDate = (releaseDate: string) => {
    if (releaseDate === '0000-00-00') return 'No Date'
    return format(parseISO(releaseDate), 'yyyy')
  }

  return (
    <>
      {games.map((game: any) => (
        <div key={game.id} className="group relative">
          <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
            <img
              src={game.thumbnail}
              alt="game image"
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-xs md:text-sm font-medium text-gray-900">
                <Link to={`/game/${game.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {game.title}
                </Link>
              </h3>
              <p className="mt-1 text-xs md:text-sm text-gray-500">{game.genre}</p>
            </div>
            <p className="text-xs md:text-sm text-gray-700">{formatDate(game.release_date)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
