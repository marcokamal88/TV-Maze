import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import axios from "axios";

const URL = "https://api.tvmaze.com/shows";
function App() {
  const [Shows, setShows] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [casts, setCasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonId, setseasonId] = useState(null);
  const [Loading, setLoading] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    axios
      .get("https://api.tvmaze.com/search/shows", {
        params: {
          q: searchTerm,
        },
      })
      .then(function (response) {
        console.log(response.data.map((obj) => obj.show));
        setShows(response.data.map((obj) => obj.show));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getData = () => {
    setLoading(true);
    axios
      .get(URL)
      .then((response) => {
        setShows(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const showDetails = (id) => {
    setseasonId(id);
    axios
      .get(URL + `/${id}/seasons`)
      .then((response) => {
        setSeasons(response.data);
        console.log(id);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(URL + `/${id}/cast`)
      .then((response) => {
        setCasts(response.data);
        console.log(response.data);
        console.log(id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {
        <div>
          <div className="head">
            <h2>available shows is:</h2>
            <div className="search">
              <input
                className="input"
                type="text"
                placeholder="search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch} className="search-btn">
                search
              </button>
            </div>
          </div>
          <div className="container">
            {Shows.map((show) => (
              <div className="displayShows" key={show.id}>
                <div className="name-btn">
                  <p className="showName">
                    {" "}
                    <span>show name:</span> {show.name}
                  </p>
                  <button
                    className="details-btn"
                    onClick={() => showDetails(show.id)}
                  >
                    show details
                  </button>
                </div>
                <div className="details">
                  {seasons === ""
                    ? null
                    : seasonId === show.id
                    ? seasons.map((season) => (
                        <div key={season.id} className="seasons">
                          <p className="seasonsNumber">
                            season: {season.number}
                          </p>
                        </div>
                      ))
                    : null}

                  {casts === ""
                    ? null
                    : seasonId === show.id
                    ? casts.map((cast) => (
                        <div key={cast.id} className="cast">
                          <p className="castName">
                            Actor name: {cast.person.name}
                          </p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      }

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
export default App;
