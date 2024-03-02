import classNames from 'classnames/bind';
import { tr } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import styles from './App.module.scss';
import AttendCountModal from './components/AttendCountModal';
import Calendar from './components/sections/Calendar';
import Contact from './components/sections/Contact';

import Heading from './components/sections/Heading';
import ImageGallery from './components/sections/ImageGallery';
import Intro from './components/sections/Intro';
import Invitation from './components/sections/Invitation';
import Map from './components/sections/Map';

import Video from './components/sections/Video';
import FullScreenMessage from './components/shared/FullScreenMessage';
import Modal from './components/shared/Modal';
import Share from './components/shared/Share';
import { Wedding } from './models/wedding';

const cx = classNames.bind(styles);

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null);
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
  if (wedding == null) {
    return null;
  }

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding;

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        location={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />
      {/* {JSON.stringify(wedding)} */}
      {/* <Modal
        open={true}
        title="현재 참석자"
        body={
          <div>
            <input />
          </div>
        }
        onLeftButtonClick={() => {
          console.log('왼쪽 클릭');
        }}
        onRightButtonClick={() => {
          console.log('오른쪽 클릭');
        }}
      /> */}
      <AttendCountModal wedding={wedding} />
    </div>
  );
}

export default App;
