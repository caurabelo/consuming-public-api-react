import React, { useEffect, useState } from "react";
import "./ApiAxios.css";
import Constants from "../../constants";
import axios from "axios";

function ApiAxios() {
  const getHeaders = () => {
    return {
      "Content-Type": "application/json",
    };
  };

  let [loading, setLoading] = useState<boolean>(true);
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
    const options = {
      headers: getHeaders(),
    };

    axios(
      Constants.API_ROUTES.BASE +
        Constants.API_ROUTES.COMICS +
        `?apikey=${Constants.API_KEY}&limit=40&noVariants=true`,
      options
    )
      .then((res) => {
        setLoading(false);
        if (res.data.data) {
          setFilteredComics(filterComicsWithImages(res.data.data.results));
        }
      })
      .catch((error) => {
        console.log(">>>>>ERROR", error);
      });
  }, []);

  return (
    <div className="App">
      <h3>API Axios</h3>
      <div className="content">
        {loading ? <div className="loading">Loading...</div> : ""}
        {filteredComics?.map((element) => showImages(element))}
      </div>
    </div>
  );
}

export default ApiAxios;