import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit} from '@fortawesome/free-solid-svg-icons'

import CreateAndEditUnitCheckModalDialog from '../../../../../layouts/JobDetails/SupervisorView/components/ChecksWidget/components/CreateUnitChecksModalView/CreateChecksModalView';
import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton'

import { BUTTONS_TEXT } from '../../../../../../constants/index';
import { GLOBAL_COLORS } from '../../../../../../constants';

import {
  KPIsAndGoalsContentRow,
  TimeBox,
  TimeBoxesWrapper,
  TimeBoxTitle,
  TimeBoxValue,
} from '../../styledComponents';

export const GoalsContentRow = React.memo(({ titles, item, setUnitsPlanned }) => {
  const [unitsPlannedInModal, setUnitsPlannedInModal] = useState('');
  const [isModalShow, setIsModalShow] = useState(false);

  const closeUnitsPlannedModal = () => {
    setIsModalShow(false);
    setUnitsPlannedInModal('');
  }

  const onChangeUnitsPlanned = (e) => {
    setUnitsPlannedInModal(e.target.value)
  }

  const isIntegerAboveZero = (value) => Number.isInteger(+value) && +value > 0

  const submitUnitsPlannedModal = () => {
    if (isIntegerAboveZero(unitsPlannedInModal)) {
      setIsModalShow(false);
      setUnitsPlanned(item.id, unitsPlannedInModal)
      setUnitsPlannedInModal('')
    }
  }

  return (
    <KPIsAndGoalsContentRow>
      <Typography variant="h5">
        {item.name}
      </Typography>
      <TimeBoxesWrapper>
        <TimeBox>
          <TimeBoxTitle bgcolor={GLOBAL_COLORS.monitorGoalsTitleBGColor}>
            <Typography variant="h5">{titles.firstBoxTitle}</Typography>
          </TimeBoxTitle>
          <TimeBoxValue position='relative'>
            <Typography variant="subtitle1">{item.planned.toString().replace(/^0$/g, "\u00a0")}
              <CustomIconButton 
                color='secondary'
                icon={<FontAwesomeIcon icon={faEdit}/>}
                iconFontSize='14px'
                onClick={() => setIsModalShow(true)} 
                backimage='linear-gradient(to bottom,#93c6f4,#064289)'
                backimagehover='linear-gradient(to bottom,#0679c5,#064289);'
                borderradius='2px'
                padding='2px'
                position='absolute'
                right='4px'
              />
            </Typography>
          </TimeBoxValue>
        </TimeBox>
        <TimeBox>
          <TimeBoxTitle bgcolor={GLOBAL_COLORS.monitorGoalsTitleBGColor}>
            <Typography variant="h5">{titles.secondBoxTitle}</Typography>
          </TimeBoxTitle>
          <TimeBoxValue>
            <Typography variant="subtitle1">{item.shipped.toString().replace(/^0$/g, "\u00a0")}</Typography>
          </TimeBoxValue>
        </TimeBox>
      </TimeBoxesWrapper>
      <CreateAndEditUnitCheckModalDialog 
        open={isModalShow}
        disableMultiline={true}
        buttonsNames={{
          confirmButtonText: BUTTONS_TEXT.set,
          cancelButtonText: BUTTONS_TEXT.cancel,
        }}
        onChangeUnitCheckDescription={onChangeUnitsPlanned}
        unitCheckDescription={unitsPlannedInModal}
        onClose={closeUnitsPlannedModal}
        headerText='UNITS PLANNED'
        placeholder='integer number above zero...'
        fieldName='UNITS PLANNED'
        onClickCancel={closeUnitsPlannedModal}
        onClickConfirm={submitUnitsPlannedModal}
        error={!isIntegerAboveZero(unitsPlannedInModal) && unitsPlannedInModal}
        helperText={
          (!isIntegerAboveZero(unitsPlannedInModal) && unitsPlannedInModal) 
            ? 'The value should be an integer number above zero'
            : ''}
      />
    </KPIsAndGoalsContentRow>
  );
});
