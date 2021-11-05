import React from 'react';
import { useData } from './ServerData';

const Content = ({ store }) => {
  const [counter, setCounter] = React.useState(0);
  const increment = React.useCallback(
    () => setCounter((x) => x + 1)
  , [setCounter]);
  const contentData = useData(store.content);
  return (
    <div className='content'>
      { contentData.body }
      <button onClick={increment}>Click me - {counter}</button>
    </div>
  );
}

export default Content;