import * as PropTypes from 'prop-types';

import {
  BUTTONS_TEXT,
  GLOBAL_COLORS,
  NAVIGATION_PANEL_INFO,
} from '../../../../../../constants';
import { BackIcon, HomeIcon } from '../../../../../../components/SvgIcons/svgIcons';
import {
  CreateJobBlock,
  InformationBlock,
  MainNavigationWrapper,
  NavigationPanelWrapper,
  SecondaryNavigationWrapper,
} from './styledComponents';

import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';
import DropDownSelect from '../../../../../../components/DropDownSelect';
import React from 'react';
import { StyledButton } from '../../../../../../components/Buttons/styledComponents';
import Typography from '@material-ui/core/Typography';

const jobStatusesInitialData = [
  { value: '', text: 'Set job status' },
];

const NavigationPanel = ({
  onSelectHandle,
  onHomeHandle,
  onBack,
  data,
  jobStatuses,
  selectedValue = '',
  isStatusesUpdated,
  handleCreateJob,
}) => {
  const parsedJobStatuses = jobStatuses.map(item => ({ value: item.id, text: item.description }));
  const statuses = [...jobStatusesInitialData, ...parsedJobStatuses];
  return (
    <NavigationPanelWrapper>
      <MainNavigationWrapper>
        <CustomIconButton
          disableFocusRipple
          color="primary"
          onClick={onBack}
          disableRipple
          icon={<BackIcon />}
          iconFontSize="17px"
        />
        <CustomIconButton
          disableFocusRipple
          color="primary"
          onClick={onHomeHandle}
          disableRipple
          icon={<HomeIcon />}
          iconFontSize="31px"
        />
        <StyledButton disableRipple textcolor={GLOBAL_COLORS.navigationColor} onClick={onHomeHandle}>Home</StyledButton>
      </MainNavigationWrapper>
      <SecondaryNavigationWrapper>
        <InformationBlock>
          {
            NAVIGATION_PANEL_INFO.map((item, index) => {
              const value = index > 2 ? item : `${item}#`;
              return (
                <Typography
                  variant="subtitle2"
                  key={`${item}#-${data[item]}`}
                >
                  {`${value}: ${data[item]}`}
                </Typography>
              );
            })
          }
        </InformationBlock>
        <CreateJobBlock>
          <DropDownSelect
            value={selectedValue}
            width={250}
            isStatusesUpdated={isStatusesUpdated}
            onChange={onSelectHandle}
            displayEmpty
            variant="outlined"
            items={statuses}
            ishidden={data.queuePosition !== 'New' ? 1 : 0}
          />
          <ContainedButton
            variant="contained"
            color="primary"
            colorType={data.queuePosition !== 'New' ? "red" : "classic"}
            ishidden={data.queuePosition !== 'New' ? 0 : 0}
            text={data.queuePosition !== 'New' ? BUTTONS_TEXT.issueRevision : BUTTONS_TEXT.createJob}
            onClick={handleCreateJob}
          />
        </CreateJobBlock>
      </SecondaryNavigationWrapper>
    </NavigationPanelWrapper>
  );
};

NavigationPanel.propTypes = {
  onSelectHandle: PropTypes.func,
  selectedValue: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  onHomeHandle: PropTypes.func,
  onBack: PropTypes.func,
  isStatusesUpdated: PropTypes.bool,
  jobStatuses: PropTypes.instanceOf(Array),
};

export default React.memo(NavigationPanel); // ___
