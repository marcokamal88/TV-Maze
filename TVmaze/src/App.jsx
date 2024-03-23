import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import axios from "axios";

function App() {
  const [Shows, setShows] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [casts, setCasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonId, setseasonId] = useState(null);
  const [open, setOpen] = useState(true);

  const URL = "https://api.tvmaze.com/shows";

  const getData = () => {
    axios
      .get(URL)
      .then((response) => {
        setShows(response.data);
        // setLoading(false);
        // console.log(Shows);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const search = Shows.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  setInterval(() => {
    setOpen(false);
  }, 3000);

  return (
    <>
      {!open ? (
        <div>
          {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
          {console.log("2")}
          <div className="head">
            <h2>available shows is:</h2>
            <div className="search">
              <input
                className="input"
                type="text"
                placeholder="search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">search</button>
            </div>
          </div>
          <div className="container">
            {searchTerm === ""
              ? Shows.map((show) => (
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
                ))
              : search.map((show) => (
                  <div className="displayShows" key={show.id}>
                    <div className="name-btn">
                      <p className="showName">
                        <span>show name:</span>
                        {show.name}
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
                              <p className="castName">Actor name: {cast.person.name}</p>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
export default App;
