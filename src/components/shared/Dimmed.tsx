import classNames from 'classnames/bind';
import React from 'react';
import styles from './Dimmed.module.scss';

const cx = classNames.bind(styles);

interface DimmedProps {
  children: React.ReactNode;
}

export default function Dimmed({ children }: DimmedProps) {
  return <div className={cx('dimmed')}>{children}</div>;
}
