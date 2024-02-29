import classNames from 'classnames/bind';
import Section from '../shared/Section';

import styles from './Video.module.scss';

const cx = classNames.bind(styles);

// source를 주면 영상이 자동 재생 안됨.
// source를 썼을 때 자동 생을 하고 싶으면 video태그에 mute를 줘야함
export default function Video() {
  return (
    <Section className={cx('container')}>
      <video
        autoPlay={true}
        muted
        loop={true}
        poster="/assets/poster.jpg"
        controls
      >
        <source src="/assets/main.mp4" type="video/mp4" />
      </video>
    </Section>
  );
}
