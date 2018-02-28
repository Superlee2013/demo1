import React from 'react';
import { Row, Card } from 'antd';
import styles from './style.scss';

export default ({ index, children, border = true, title, resetStyle }) => {
  const style = {
    borderColor: border === true ? '#eee' : 'transparent',
    ...resetStyle
  };

  return (
    <React.Fragment>
      {
        title &&
        <div className={styles.title}>{title}</div>
      }
      <Card className={styles.descriptCard} style={style}>
        <div className={styles.index}>{index}</div>
        <Row>
          {children}
        </Row>
      </Card>
    </React.Fragment>
  );
};
