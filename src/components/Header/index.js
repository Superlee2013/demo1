import React from 'react';
import { Popover } from 'antd';
import styles from './style.scss';


export default function Header({ selectCompany, userInfo, basicInfo }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.title}>福建农信</div>
        {
          userInfo &&
          <div className={styles.userInfo}>
            <Popover placement="bottom" content={basicInfo} trigger="click">
              <svg
                className="icon"
                style={{ fontSize: '40px', margin: 'auto 11px auto 30px', cursor: 'pointer' }}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-touxiang" />
              </svg>
            </Popover>

            {/* <div className={styles.account}>
                <span>{userInfo.userName}</span>
                <span onClick={selectCompany}>{userInfo.cmyName}</span>
              </div> */}
            <div className={styles.account}>
              <span>{`${userInfo.roleName} - ${userInfo.userName}`}</span>
            </div>
          </div>
        }
      </div>
    </header>
  );
}
