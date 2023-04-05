import React, { useState } from 'react';

const SearchBar = () => {
	const [keyword, setKeyword] = useState<string>('');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchword = e.target.value;
		setKeyword(searchword)
	}
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(keyword);
  };
	return (
		<form className="header" onSubmit={onSubmit}>
			<input type="text" className="iptSearch" id="keyword" value={keyword} onChange={onChange} />
			<button type="submit" className="search">
				<span>검색</span>
			</button>
		</form>
	);
};

export default SearchBar;
