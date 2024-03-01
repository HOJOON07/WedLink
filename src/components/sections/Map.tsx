import { Location } from '@/models/wedding';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import Section from '../shared/Section';
import styles from './Map.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  location: Location;
}

const cx = classNames.bind(styles);

export default function Map({ location }: MapProps) {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    // autoload는 지도의 싱크를 맞추기위해 false값을 준다. 그리고 async 값을 true로 주어서 렌더링을 방해하지 않도록 함.
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`;
    script.async = true;

    document.head.appendChild(script);
    // script를 불러온 시점에 비동기로 onload를 호출하게되었음.
    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        );
        const options = {
          center: position,
          level: 3,
        };
        const marker = new window.kakao.maps.Marker({
          position,
        });
        // container는 영역을 잡음
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);
        marker.setMap(map);
      });
    };
  }, [location]);

  return (
    <Section>
      <div className={cx('wrap-map')}>
        <div className={cx('map')} ref={mapContainerRef}></div>
        <a href="">길찾기</a>
      </div>
    </Section>
  );
}
