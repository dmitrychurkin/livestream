import React, { FC, memo } from "react";
import FileIcon from "components/icons/File.svg";
import PersonOutlinedIcon from "components/icons/Person-outlined.svg";
import AppLogo from "components/atoms/AppLogo";
import Button from "components/atoms/Button";
import styles from "./Header.module.css";

const Header: FC = () => (
  <div className={styles.root}>
    <AppLogo className={styles.logo} />
    <Button startIcon={<FileIcon />}>Videos</Button>
    <Button className={styles.last} startIcon={<PersonOutlinedIcon />}>
      Username
    </Button>
  </div>
);

export default memo(Header);
