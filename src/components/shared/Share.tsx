import classNames from 'classnames/bind';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect } from 'react';
import Section from './Section';
import styles from './Share.module.scss';

declare global {
  interface Window {
    Kakao: any;
  }
}

const cx = classNames.bind(styles);
interface ShareProps {
  groomName: string;
  brideName: string;
  date: string;
}

export default function Share({ groomName, brideName, date }: ShareProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      console.log(window);
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
      }
    };
  }, []);

  const handleShareKakao = () => {
    window.kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: {
          title: `${groomName} ❤️ ${brideName}`,
          description: `${format(parseISO(date), 'M월 d일 eeee aaa h시', { locale: ko })}`,
        },
      },
    });
  };
  return <Section>Share</Section>;
}
