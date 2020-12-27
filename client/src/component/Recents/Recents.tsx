import React, { memo } from 'react';
import Icon from '../glyphs/Icon';
import SmallCard from 'component/SmallCard';
import style from './Recents.module.css';

const Recents = () => {
  const cards = [
    {
      name: 'Test1 with a long name that will take more than one line',
      image: 'Image1',
      date: '22 Nov 2020',
      size: '20 Mb'
    },
    {
      name: 'Test2',
      image: 'Image2',
      date: '22 Nov 2020',
      size: '20 Mb'
    },
    {
      name: 'Test3',
      image: 'Image3',
      date: '22 Nov 2020',
      size: '20 Mb'
    },
    {
      name: 'Test4',
      image: 'Image4',
      date: '22 Nov 2020',
      size: '20 Mb'
    },
    {
      name: 'Test5',
      image: 'Image5',
      date: '22 Nov 2020',
      size: '20 Mb'
    }
  ];

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.header}>
          <Icon name='clock-outlined' />
          <span className={style.text}>Saved videos</span>
        </div>
        <div className={style.stack}>
          {cards.map(
            ({ name, image, date, size }, index) => {
              return(
               <SmallCard
                key={name}
                className={style[`card_${index}`]}
                name={name}
                image={image}
                date={date}
                size={size}
               />
              );
            }
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Recents);
