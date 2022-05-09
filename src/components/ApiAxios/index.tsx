import React, { useEffect, useState } from "react";
import "./ApiAxios.css";
import Constants from "../../constants";
import axios from "axios";

function ApiAxios() {
  const getHeaders = () => {
    return {
      'Content-Type': 'application/json',
    };
  };

  let [loading, setLoading] = useState<boolean>(true);
  let [error, setError] = useState<boolean>(false);
  let [filteredComics, setFilteredComics] = useState<Comics>([]);

  type Image = { path: string; extension: string };

  type Comic = { images: Image[]; title: string; id: number };

  type Comics = Comic[];

  const filterComicsWithImages = (comics: Comics) => {
    return comics.filter((comic) => comic.images.length > 0);
  };

  const showImages = (comic: Comic) => {
    return (
      <div className="images" key={comic.id}>
        <p>{comic.title}</p>
        <img
          src={
            comic.images[0].path +
            "/portrait_incredible." +
            comic.images[0].extension
          }
          alt="img"
        />
      </div>
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams({
      apikey: Constants.API_KEY,
      limit: "40",
      noVariants: "true",
    });

    // String interpolation, it is the same as:
    // const ulr = Constants.API_ROUTES.BASE + Constants.API_ROUTES.COMICS;
    const url = `${Constants.API_ROUTES.BASE}${Constants.API_ROUTES.COMICS}`;

    const options = {
      params: urlParams,
      headers: getHeaders()
    };

    axios
      .get(url, options)
      .then((res) => {
        setLoading(false);
        setError(false);
        if (res.data.data) {
          setFilteredComics(filterComicsWithImages(res.data.data.results));
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <div className="App">
      <h3>API Axios</h3>
      <div className="content">
        {loading ? <div className="loading">Loading...</div> : ""}
        {error ? <div className="loading">ERROR</div> : ""}
        {filteredComics?.map((element) => showImages(element))}
      </div>
    </div>
  );
}

export default ApiAxios;
