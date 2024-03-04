import classNames from 'classnames/bind';

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
import useWedding from './hooks/useWedding';

const cx = classNames.bind(styles);

function App() {
  //1
  const { wedding, loading, error } = useWedding();

  //2
  if (loading) {
    return <FullScreenMessage type="loading" />;
  }
  if (error) {
    return <FullScreenMessage type="error" />;
  }
  if (wedding == null) {
    return null;
  }

  //3
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
      {/* 리렌더링 체크하는 버튼 */}
      {/* <button
        style={{
          position: 'fixed',
          top: '0',
        }}
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        + {count}
      </button> */}
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
      <AttendCountModal wedding={wedding} />
    </div>
  );
}

export default App;
