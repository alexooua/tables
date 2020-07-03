import * as React from "react";

interface IProps {
  onSearch: (value: string) => void;
}

export const Search = React.memo((props: IProps) => {
  return (
    <input
      type="search"
      onChange={e => props.onSearch(e.target.value)}
      placeholder="Search"
    />
  );
});
