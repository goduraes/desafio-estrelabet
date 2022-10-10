import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST
  }
});

interface getGamesProps {
  category: string;
  sort: string;
}

export const getGames = ({category, sort}: getGamesProps) => {
  return API.get(`/games?platform=${category.toLowerCase()}&sort-by=${sort.toLowerCase()}`)
};

export const getGame = (id: any) => {
  return API.get(`/game?id=${id}`)
};
