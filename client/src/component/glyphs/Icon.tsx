import React from 'react';

import { ReactComponent as FileOutlined } from './File.svg';
import { ReactComponent as PersonOutlined } from './Person-outlined.svg';
import { ReactComponent as CameraFilled } from './Camera-filled.svg';
import { ReactComponent as ClockFilled } from './Clock-filled.svg';
import { ReactComponent as ClockOutlined } from './Clock-outlined.svg';
import { ReactComponent as Cross } from './Cross.svg';

type IconConstraint = string;
type Props = { readonly name: IconConstraint, readonly fill?: string, readonly stroke?: string };

const pickIcon = (name: IconConstraint) => {
  switch(name) {
    case 'file': return FileOutlined;
    case 'person-outlined': return PersonOutlined;
    case 'camera-filled': return CameraFilled;
    case 'clock-filled': return ClockFilled;
    case 'clock-outlined': return ClockOutlined;
    case 'cross': return Cross;
    default: throw new Error('no SVG for ' + name);
  }
};

const Icon: React.FC<Props> = ({ name, fill, stroke }) => {
  const SVG: any = pickIcon(name);
  return(
    <SVG fill={ fill } stroke={ stroke }/>
  );
};

export default Icon;
