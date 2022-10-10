import React, { useEffect, useState } from 'react';
import LoadingPage from '../../components/Loading';
import { format, parseISO } from 'date-fns';
import { getGame } from '../../services/api';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './index.css';

export default () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setError] = useState<boolean>(false);
  const [game, setGame] = useState<any>();
  const [openGallery, setOpenGallery] = useState<boolean>(false);
  const [indexImg, setindexImg] = useState<number>(0);

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
    );
  };

  const formatDate = (releaseDate?: string) => {
    if (!releaseDate || releaseDate === '0000-00-00') return 'No Date';
    return format(parseISO(releaseDate), 'MMMM yyyy');
  };

  useEffect(() => {
    DetailsGame();
  }, []);

  return (
    <div id="game" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-start border-b border-gray-200 pt-8 pb-6">
          <Link to="/" className="mr-3 rounded duration-200 hover:bg-gray-200">
            <ChevronLeftIcon className="h-8 w-8" aria-hidden="true" />
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {game?.title}
          </h1>
        </div>
      </div>

      {!loading && !erro && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-5">
            <div className="group relative m-auto">
              <div
                className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden
                  rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none"
              >
                <img
                  className="rounded-xl"
                  src={game?.thumbnail}
                  alt="Thumbnail"
                />
              </div>
              <a target="_blank" rel="noreferrer" href={game?.game_url}>
                <span aria-hidden="true" className="absolute inset-0" />
              </a>
            </div>

            <div className="flex flex-wrap gap-5 m-auto">
              <div>
                <span className="font-bold">Game info:</span>
                {infoGame('Platform:', game?.platform)}
                {infoGame('Developer:', game?.developer)}
                {infoGame('Genre:', game?.genre)}
                {infoGame('Publisher:', game?.publisher)}
                {infoGame('Release Date:', formatDate(game?.release_date))}
                {infoGame('Status:', game?.status)}
              </div>
              {game?.minimum_system_requirements && (
                <div>
                  <span className="font-bold">Requirements:</span>
                  {infoGame(
                    'Graphics:',
                    game?.minimum_system_requirements?.graphics,
                  )}
                  {infoGame(
                    'Memory:',
                    game?.minimum_system_requirements?.memory,
                  )}
                  {infoGame('OS:', game?.minimum_system_requirements?.os)}
                  {infoGame(
                    'Processor:',
                    game?.minimum_system_requirements?.processor,
                  )}
                  {infoGame(
                    'Storage:',
                    game?.minimum_system_requirements?.storage,
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className="my-5"
            dangerouslySetInnerHTML={{ __html: game?.description }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {game?.screenshots.map(
              (el: { id: number; image: string }, i: number) => (
                <div className="group relative m-auto" key={el.id}>
                  <div
                    className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden
                    rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none"
                  >
                    <img
                      className="rounded-xl cursor-pointer"
                      src={el.image}
                      alt="Screenshot"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setindexImg(i);
                      setOpenGallery(true);
                    }}
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                  </button>
                </div>
              ),
            )}
          </div>

          {openGallery && (
            <Lightbox
              mainSrc={game?.screenshots[indexImg].image}
              nextSrc={
                indexImg < game?.screenshots.length - 1
                  ? game?.screenshots[indexImg + 1].image
                  : ''
              }
              prevSrc={
                indexImg > 0 ? game?.screenshots[indexImg - 1].image : ''
              }
              onCloseRequest={() => setOpenGallery(false)}
              onMovePrevRequest={() => {
                indexImg > 0 && setindexImg(indexImg - 1);
              }}
              onMoveNextRequest={() => {
                indexImg < game?.screenshots.length - 1 &&
                  setindexImg(indexImg + 1);
              }}
            />
          )}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center absolute top-0 bg-gray-100 w-screen h-screen">
          <LoadingPage />
        </div>
      )}

      {!loading && erro && (
        <div className="flex justify-center items-center h-full pt-8">
          <span className="text-red-500">
            Houve um erro - Tente novamente mais tarde!
          </span>
        </div>
      )}
    </div>
  );
};
