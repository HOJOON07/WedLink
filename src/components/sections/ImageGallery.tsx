import generateImageUrl from '@/utils/generateImageUrl';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import ImageViewer from '../ImageViewer';
import Section from '../shared/Section';
import styles from './ImageGallery.module.scss';

const cx = classNames.bind(styles);

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const open = selectedIndex > -1;

  const handleSelectedImage = (index: number) => {
    console.log(open);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(-1);
  };
  return (
    <React.Fragment>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, idx) => {
            return (
              <li
                key={idx}
                className={cx('wrap-image')}
                onClick={() => {
                  handleSelectedImage(idx);
                }}
              >
                {/* <img src={src + '.jpg'} alt="갤러리 이미지" /> */}
                <picture>
                  <source
                    srcSet={generateImageUrl({
                      filename: src,
                      format: 'webp',
                      option: 'w_240,h_240,q_auto,c_fill',
                    })}
                    type="image/webp"
                  />
                  <img
                    src={generateImageUrl({
                      filename: src,
                      format: 'webp',
                      option: 'w_240,h_240,q_auto,c_fill',
                    })}
                    alt="이미지"
                  />
                </picture>
              </li>
            );
          })}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIndex={selectedIndex}
        onClose={handleClose}
      />
    </React.Fragment>
  );
}
