import "./styles/App.css";
import React from "react";
import Row from "./pages/Row";
import requests from "./api/requests";
import Banner from "./pages/Banner";
import Nav from "./pages/Nav";

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <div className="space"></div> {/* Ajouter cet élément de séparation */}
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <div className="space"></div>
      {/* ... Autres rows ... */}
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <div className="space"></div>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <div className="space"></div>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <div className="space"></div>
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <div className="space"></div>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <div className="space"></div>
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <div className="space"></div>
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <div className="space"></div>
    </div>
  );
}

export default App;
