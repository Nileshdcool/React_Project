import React from 'react';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { overrideWidgetItemsSortIndex } from '../../../../../../utils/jobDetailsFunctions';
import {
  ITPVDRWidgetHeader,
  ITPVDRWidgetWrapper,
  LeftBlock,
  StyledTypography,
  SupervisorWidgetsWrapper,
} from '../styledComponents';
import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';
import { updateWidgetITPs } from '../../../../../../actions/supervisorITPs';
import { selectStationWidgetITPs } from '../../../../../../selectors/supervisorITPs';

const ITPWidget = ({
  title,
  stationWidgetITPs,
  handleAddedEntities,
  updateWidgetITPs,
}) => {

  const removeITP = file => {
    const updatedWidgetItemsArray = overrideWidgetItemsSortIndex(stationWidgetITPs.filter(item =>
      item.itpNumber !== file.itpNumber));
    updateWidgetITPs(updatedWidgetItemsArray);
    handleAddedEntities();
  };

  return (
    <SupervisorWidgetsWrapper>
      <ITPVDRWidgetHeader>
        <StyledTypography variant="subtitle1">{title}</StyledTypography>
      </ITPVDRWidgetHeader>
      <ITPVDRWidgetWrapper withoutDragIcon>
        <ul>
          {stationWidgetITPs && stationWidgetITPs.map((item, index) => (
            <Tooltip title={item.itpNumber} placement="top">
              <li
                key={`${item.itpNumber}-${index}`}
              >
                <LeftBlock>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <Typography variant="body2">
                    {item.itpNumber}
                  </Typography>
                  </a>
                </LeftBlock>
                <CustomIconButton
                  color="mainCardTitleColor"
                  onClick={() => removeITP(item)}
                  disableRipple
                  icon={<ClearIcon />}
                  iconFontSize="20px"
                />
              </li>
            </Tooltip>
          ))}
        </ul>
      </ITPVDRWidgetWrapper>
    </SupervisorWidgetsWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  stationWidgetITPs: selectStationWidgetITPs(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateWidgetITPs,
}, dispatch);


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  React.memo,
  withConnect,
)(ITPWidget);
