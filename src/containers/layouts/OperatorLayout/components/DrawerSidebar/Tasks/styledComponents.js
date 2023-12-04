import Typography from '@material-ui/core/Typography';
import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button';
import { BUTTONS_BACKGROUND_COLORS } from '../../../../../../constants';

export const TasksPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  //height: 100%;
  //overflow: hidden;
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #edf0f2;
`;

// export const MaterialsBlocksWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 600px;
//   overflow: hidden;
// `;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 20px;
  height: 100%;
`;

export const TaskTitle = styled(Typography)`
  &.MuiTypography-h4 {
    width: 125px;
    height: 39px;
    font-family: Roboto;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #425a70;
  }
`;

export const UnitsCounterWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

export const UnitTitle = styled(TaskTitle)`
margin-right: 20px;
  &.MuiTypography-h4 {
    width: 65px;
    height: 30px;
    font-size: 24px;
    font-weight: normal;
    line-height: 1.5;
  }
`;

export const CountsTitle = styled(UnitTitle)`
  &.MuiTypography-h4 {
    width: 90px;
    height: 30px;
    font-weight: bold;
    text-align: right;
  }
`;

export const TimeSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const ActiveLineJobsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  margin-right: 16px;
`;

const initialBlocksMinHeight = {
  operation: '170px',
  inspection: '170px',
  unitchecks: '240px',
};

export const GeneralCss = css`
  display: flex;
  width: 350px;
  ${props => props.isBlockMinHeight && 'overflow: hidden'};
`;

export const UnitChecksWrapper = styled.div`
  margin-top: 15px;
  min-height: ${props => props.isBlockMinHeight ? initialBlocksMinHeight.unitchecks : 'max-content'};
  ${GeneralCss};
`;

export const OperationTasksWrapper = styled.div`
  min-height: ${props => props.isBlockMinHeight ? initialBlocksMinHeight.operation : 'max-content'};
  ${GeneralCss};
`;

export const IspectionTasksWrapper = styled.div`
  min-height: ${props => props.isBlockMinHeight ? initialBlocksMinHeight.inspection : 'max-content'};
  ${GeneralCss};
`;

export const ChecksContainedButton = styled(Button)`
  height: 20px;
  &.MuiButton-root {
    min-width: 50px;
  }
  background-image: ${props =>
    (BUTTONS_BACKGROUND_COLORS[props.colortype])};
  &.MuiButton-contained:hover {
    background-image: ${props =>
    (BUTTONS_BACKGROUND_COLORS[`${props.colortype}Hovered`])};
  }
  &.selectedButton {
    background-image: ${BUTTONS_BACKGROUND_COLORS.classicInverted};
    }
  &.selectedButton:hover {
    background-image: ${BUTTONS_BACKGROUND_COLORS.classicInvertedHovered};
  }
  &.MuiButton-containedPrimary {
    border: solid 1px #707070;
  }
  &.MuiButton-outlinedPrimary {
    border: solid 1px #707070;
    color: #707070;
  }
  &.MuiButton-outlinedPrimary:hover {
    border: solid 1px #707070;
  }
  &.MuiButton-containedSecondary {
    border: solid 1px #425a70;
  }
  &.MuiButton-contained.Mui-disabled {
        background-image: ${BUTTONS_BACKGROUND_COLORS.disabled};
  }
  &.MuiButton-outlined, .MuiButton-containedPrimary {
    padding: 3px 10px;
  }
`;
