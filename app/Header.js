import React from 'react';
import { useData } from './ServerData';

const Header = ({ store }) => {
  const headerData = useData(store.header);
  return (
    <ul className='header'>
      { headerData.items.map((item, i) => {
        return <li key={i}>{item}</li>
      }) }
    </ul>
  );
}

export default Header;