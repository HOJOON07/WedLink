import classNames from 'classnames/bind';
import React from 'react';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

interface SectionPros {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Section({ children, className, title }: SectionPros) {
  return (
    <section className={cx(['container', className])}>
      {title && <div className={cx('txt-title')}>{title}</div>}
      {children}
    </section>
  );
}
