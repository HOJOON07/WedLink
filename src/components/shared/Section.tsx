import classNames from 'classnames/bind';
import React from 'react';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

interface SectionPros {
  children: React.ReactNode;
}

export default function Section({ children }: SectionPros) {
  return <section className={cx('container')}>{children}</section>;
}
