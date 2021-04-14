import React, { FC, memo } from "react";
import clsx from "clsx";
import FolderVideoOutlinedIcon from "components/icons/Folder-outlined.svg";
import CameraOutlinedIcon from "components/icons/Camera-outlined.svg";
import PersonOutlinedIcon from "components/icons/Person-outlined.svg";
import AppLogo from "components/atoms/AppLogo";
import Button from "components/atoms/Button";
import MenuIcon from "components/icons/Hamburger.svg";
import styles from "./Header.module.css";

const Header: FC = () => (
  <div className={styles.root}>
    <div className={styles.rootSmallScreen}>
      <AppLogo className={styles.logo} />
      <Button className={styles.menuButton} startIcon={<MenuIcon />} />
    </div>
    <div className={styles.rootBigScreen}>
      <AppLogo className={styles.logo} />
      <div className={styles.navigationBar}>
        <Button
          className={clsx(
            styles.navigationButton,
            styles.navigationButtonActive
          )}
          startIcon={<CameraOutlinedIcon />}
        >
          Record video
        </Button>
        <Button
          className={styles.navigationButton}
          startIcon={<FolderVideoOutlinedIcon />}
        >
          Saved videos
        </Button>
      </div>
      <Button className={styles.last} startIcon={<PersonOutlinedIcon />}>
        CW
      </Button>
    </div>
  </div>
);

export default memo(Header);
