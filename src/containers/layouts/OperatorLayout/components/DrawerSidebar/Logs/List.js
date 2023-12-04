import React, { useEffect, useRef } from 'react';

import {
  ListBody,
  NoTasks,
} from '../Tasks/Lists/styledComponents';

import {
  ListHeaderCell,
  ListItem,
  ListItemCell
} from './styledComponents';


export const LogsList = React.memo(({ logs }) => {
  const scrollToRef = (ref) => ref.current.scrollTop = ref.current.scrollHeight;
  const listRef = useRef(null);

  useEffect(() => {
    scrollToRef(listRef);
  }, []);

  return (
    <ListBody ref={listRef}>
      <ListItem>
        <ListHeaderCell width={10}>#</ListHeaderCell>
        <ListHeaderCell width={80}>OPERATOR</ListHeaderCell>
        <ListHeaderCell width={80}>DURATION</ListHeaderCell>
        <ListHeaderCell width={80}>DATE</ListHeaderCell>
      </ListItem>
      {!!logs.length
        ? logs.map((item, i) => (
          <ListItem key={`id-${i}`}>
            <ListItemCell width={10}>{i + 1}</ListItemCell>
            <ListItemCell width={80}>{item.operator}</ListItemCell>
            <ListItemCell width={80}>{item.duration}</ListItemCell>
            <ListItemCell width={80}>{item.date}</ListItemCell>
          </ListItem>))
        : <NoTasks>No logs</NoTasks>}
    </ListBody>
  )
});
