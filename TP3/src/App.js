import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import films from "./Film.json";

function Film(props) {
  return (
    <div class="center">
      <div class="property-card">
        <a href="#">
          <div>
            <img src={props.image} class="property-image" />
            <div class="property-image-title"></div>
          </div>
        </a>
        <div class="property-description">
          <h5> {props.title} </h5>
          <br />
          <table>
            <thead>
              <tr>
                <th colspan="3">{props.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Id</td>
                <td colspan="2">{props.id}</td>
              </tr>
              <tr>
                <td>Rang</td>
                <td colspan="2">{props.rank}</td>
              </tr>
              <tr>
                <td>Titre complet</td>
                <td colspan="2">{props.fullTitle}</td>
              </tr>
              <tr>
                <td>Année</td>
                <td colspan="2">{props.year}</td>
              </tr>
              <tr>
                <td>Membre</td>
                <td colspan="2">{props.crew}</td>
              </tr>
              <tr>
                <td>imDB Notation / 10</td>
                <td align="center" colspan="2">
                  {props.imDbRating}
                  <img
                    class="ratingClasse"
                    src={
                      props.imDbRating > parseFloat("8.8")
                        ? "https://upload.wikimedia.org/wikipedia/commons/9/9c/Golden_star.svg"
                        : "https://cyberlearn.hes-so.ch/pluginfile.php/2762988/mod_resource/content/0/pouce-vert.png"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>imDB classement</td>
                <td colspan="2">{props.imDbRatingCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <a href="#">
          <div class="property-social-icons"></div>
        </a>
      </div>
    </div>
  );
}

Film.propTypes = {
  id: PropTypes.string,
  rank: PropTypes.string,
  title: PropTypes.string,
  fullTitle: PropTypes.string,
  year: PropTypes.string,
  image: PropTypes.string,
  crew: PropTypes.string,
  imDbRating: PropTypes.string,
  imDbRatingCount: PropTypes.string
};

export default function App() {
  // console.log(users.results);
  return (
    <div className="App">
      <h1>Film au graphie</h1>
      <h2>Découvrez tout les plus grands films</h2>
      <main className="main-area">
        <div className="cards">
          {films.items.map((film, index) => {
            return <Film {...film} key={index} />;
          })}
        </div>
      </main>
    </div>
  );
}
