import React, { useEffect, useState } from 'react';
import LoadingPage from '../../components/Loading';
import { format } from 'date-fns';
import { getGame } from '../../services/api';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

export default () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setError] = useState<boolean>(false);
  const [game, setGame] = useState<any>();

  const DetailsGame = () => {
    setLoading(true);
    getGame(id)
      .then(resp => {
        setGame(resp.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const infoGame = (label: string, value?: string) => {
    if (!value) return;
    return (
      <div>
        <span className="font-bold">{label} </span>
        <span>{value}</span>
      </div>
    )
  }

  useEffect(() => {
    DetailsGame();
  }, []);

  return (
    <div id="game" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-start border-b border-gray-200 pt-8 pb-6">
          <Link to="/" className="mr-3 rounded duration-200 hover:bg-gray-200">
            <ChevronLeftIcon
              className="h-8 w-8"
              aria-hidden="true"
            />
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {game?.title}
          </h1>
        </div>
      </div>

      {!loading && !erro && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {infoGame('Platform', game?.platform)}
          {infoGame('Developer', game?.developer)}
          {infoGame('Genre', game?.genre)}
          {infoGame('Publisher', game?.publisher)}
          {infoGame('Release Date', game?.release_date)}
          {infoGame('Status', game?.status)}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center absolute top-0 bg-gray-100 w-screen h-screen">
          <LoadingPage />
        </div>
      )}

      {!loading && erro && (
        <div className="flex justify-center items-center h-full pt-8">
          <span className="text-red-500">Houve um erro - Tente novamente mais tarde!</span>
        </div>
      )}
    </div>
  );
};
