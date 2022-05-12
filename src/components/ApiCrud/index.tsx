import React, { useEffect, useState } from 'react';
import './ApiCrud.css';
import Constants from '../../constants';
import axios from "axios";
import { Comics, Comic } from '../../models/comics';

function ApiCrud() {
  const getHeaders = () => {
    return {
      "Content-Type": "application/json",
    };
  };

  let [loading, setLoading] = useState<boolean>(true);
  let [error, setError] = useState<boolean>(false);
  let [favouriteComics, setFavouriteComics] = useState<Comics>([]);
  const [comic, setComic] = useState<string>('');
  
  const url = `${Constants.API_ROUTES.BASE_CRUD}${Constants.API_ROUTES.RESOURCE}`;
  const options = {
    headers: getHeaders(),
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(false);
    setLoading(false);
    setComic(event.target.value);
  };

  const showComics = (comic: Comic) => {
    return (
      <div className="images-container" key={comic._id}>
        <p>{comic.title}</p>
        <img
          src="/trash.svg"
          alt="Remove Comic"
          onClick={() => deleteFavouriteComic(comic._id)}
        />
      </div>
    );
  };

  const getFavouriteComics = () => {
    setLoading(true);

    axios
      .get(url, options)
      .then((res) => {
        setLoading(false);
        setError(false);
        setFavouriteComics(res.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  const postFavouriteComic = () => {
    setLoading(true);

    const data = { title: comic };

    if (comic !== '') {
      axios
        .post(url, data, options)
        .then((res) => {
          setLoading(false);
          setError(false);
          const comics = favouriteComics;
          comics.push(res.data);
          setFavouriteComics(comics);
          setComic('');
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const deleteFavouriteComic = (id: string) => {
    setLoading(true);

    const urlDelete = url + '/' + id;

    axios
      .delete(urlDelete, options)
      .then((res) => {
        setLoading(false);
        setError(false);
        getFavouriteComics();
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getFavouriteComics();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Favorite Comics</h1>
      </header>
      <h3>API Crud</h3>
      <input type="text" value={comic} onChange={handleInputChange}></input>
      <button onClick={postFavouriteComic}>Insert your comic</button>
      <div className="content-comics">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          favouriteComics?.map((element) => showComics(element))
        )}
        {error ? <div className="loading">ERROR</div> : ""}
      </div>
    </div>
  );
}

export default ApiCrud;
