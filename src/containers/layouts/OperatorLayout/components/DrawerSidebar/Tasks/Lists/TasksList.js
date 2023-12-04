import React, { Fragment, useState } from 'react';

import FixtureDialog from '../../../../../../../components/ModalDialog/FixtureDialog';

import {
  FixtureIcon,
  ListBody,
  ListItem,
  NoTasks,
  TaskName,
  TaskNumber
} from './styledComponents';

export const TasksList = React.memo(({ tasks }) => {
  const [isOpened, openModal] = useState(false);
  const [fixture, setFixture] = useState(false);

  const handleFixtureModal = text => {
    setFixture(text)
    openModal(!isOpened);
  }

  return (
    <Fragment>
      <ListBody>
        {!!tasks.length
          ? tasks.map((item, i) => (
            <ListItem key={item.id}>
              <TaskNumber>{i + 1}</TaskNumber>
              <TaskName>{item.text}</TaskName>
              {item.fixture ? <FixtureIcon onClick={() => handleFixtureModal(item.fixture)} /> : null}
            </ListItem>))
          : <NoTasks>No tasks</NoTasks>}
      </ListBody>
      <FixtureDialog isOpened={isOpened} onClose={() => openModal(false)} text={fixture} />
    </Fragment>
  )
});
