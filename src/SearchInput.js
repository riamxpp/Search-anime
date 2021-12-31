import React from "react";
import useDebounce from "./Hooks/useDebounce";

const SearchInput = ({ value, setValue }) => {
  // O display value é apenas para mostrar para o usuarios
  const [displayValue, setDisplayValue] = React.useState(value);

  const debounceChange = useDebounce(setValue, 500);

  function handleChange({ target }) {
    setDisplayValue(target.value);
    debounceChange(target.value);
  }

  return <input type="search" value={displayValue} onChange={handleChange} />;
};

export default SearchInput;
