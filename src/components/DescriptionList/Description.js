import React from 'react';
import { Col } from 'antd';
import styles from './style.scss';

const Description = ({ term, children, end }) => {
  const labelCol = { span: 4 };
  const contentCol = {
    span: end === true ? 19 : 7,
    offset: 1
  };

  return (
    <React.Fragment>
      <Col {...labelCol} className={styles.label}>
        {term}
      </Col>
      <Col {...contentCol} className={styles.content}>
        {children}
      </Col>
    </React.Fragment>
  );
};

export default Description;
