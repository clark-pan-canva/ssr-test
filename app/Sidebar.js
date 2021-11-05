import React from 'react';
import { useData } from './ServerData';

const Sidebar = ({ store }) => {
  const sidebarData = useData(store.sidebar);
  return (
    <ul className='sidebar'>
      { sidebarData.items.map((item, i) => {
        return <li key={i}>{item}</li>
      }) }
    </ul>
  );
}

export default Sidebar;