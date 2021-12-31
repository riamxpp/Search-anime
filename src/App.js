import React from "react";
import "./App.css";
import useFetch from "./Hooks/useFetch";
import SearchInput from "./SearchInput";

const url = "https://kitsu.io/api/edge";

function App() {
  const [search, setSearch] = React.useState("");
  const [info, setInfo] = React.useState({});
  const { loading, error, request } = useFetch(
    `${url}/anime?filter[text]=${search}&page[limit]=12`
  );

  React.useEffect(() => {
    setInfo({});
    async function pegaData() {
      const { json } = await request();
      setInfo(json);
      return;
    }
    if (search) {
      pegaData();
    }
  }, [search, request]);

  if (error) return <div>Houver um erro!</div>;
  return (
    <div className="App">
      <h4>Anime</h4>
      <SearchInput value={search} setValue={setSearch} />
      {loading && <p>Carregando...</p>}
      {info.data && (
        <ul className="animes">
          {info.data.map((anime) => {
            return (
              <li key={anime.id}>
                <p>{anime.attributes.canonicalTitle}</p>
                <img
                  src={anime.attributes.posterImage.small}
                  alt={anime.attributes.canonicalTitle}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
