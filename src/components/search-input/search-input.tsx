import React, { FC, useState, ChangeEvent, useCallback } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { debounce } from "lodash";

export interface SearchInputProps {
  search?: string;
  searchChange(value: string): void;
}

export const SearchInput: FC<SearchInputProps> = ({ search, searchChange }) => {
  const [searchValue, setSearchValue] = useState(search);

  const searchChangeDebounced = useCallback(debounce(searchChange, 1000), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("value", value);
    setSearchValue(value);
    searchChangeDebounced(value);
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        value={searchValue}
        onChange={handleChange}
        placeholder="Поиск по партнерам"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
    </InputGroup>
  );
};
