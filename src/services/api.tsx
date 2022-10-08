import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://mmo-games.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'a9e27c64b9mshfe318fa32c18accp1523b7jsn8b55a9345e02',
    'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
  }
});

interface getGamesProps {
  Category: string;
  Sort: string;
}

export const getGames = ({Category, Sort}: getGamesProps) => {
  return API.get(`/games?platform=${Category.toLowerCase()}&sort-by=${Sort.toLowerCase()}`)
};

export const getGame = (id: any) => {
  return API.get(`/game?id=${id}`)
};
