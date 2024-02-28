import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './App.module.scss';

import Heading from './components/sections/Heading';
import Video from './components/sections/Video';
import FullScreenMessage from './components/shared/FullScreenMessage';

const cx = classNames.bind(styles);

function App() {
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (!res.ok) {
          setError(true);
          throw new Error('청첩장 정보를 불러오지 못했습니다.!!');
        }
        return res.json();
      })
      .then((data) => {
        setWedding(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <FullScreenMessage type="loading" />;
  }
  if (error) {
    return <FullScreenMessage type="error" />;
  }
  return (
    <div className={cx('container')}>
      <Heading />
      <Video />
      {JSON.stringify(wedding)}
    </div>
  );
}

export default App;
