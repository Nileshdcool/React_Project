import { JOBS_COLUMN_HEIGHT, LABEL_COLORS } from '../../../constants';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const TileJobWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-shadow: none;
  outline: 1px solid #707070;
  border-radius: 0;
  background-color: #cecece;
  margin-left: 10px;
  padding: 0;
  &.MuiPaper-rounded {
    border-radius: 0;
  }
  &.jobColumn {
    background-color: #cecece;
  }
  
  &:first-child {
    margin-left: 0;
  }
`;

export const TileWrapper = styled.div`
  width: 100%;
  //height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const JobWrapperLineTitle = styled.div`
  display: flex;
  padding: 12px 20px;
  background-color: #07639c;
  color: #ffffff;
  text-align: left;
  margin-bottom: 10px;
`;

export const JobWrapperLineContent = styled.div`
  background-color: #cecece;
  padding: 0px 10px 10px 10px;
  overflow-y: auto;
  height: ${JOBS_COLUMN_HEIGHT}px;
`;

export const TileJobCardWrapper = styled(Card)`
  position: relative;
  border-radius: 0;
  box-shadow: none;
  padding: 10px 10px 10px 15px;
  margin-bottom: 10px;
  border: solid 1px #707070;
  background-color: #ffffff;
  &.MuiPaper-rounded {
    border-radius: 0;
  }
  .MuiCardHeader-root {
    padding: 0px;
    padding-bottom: 7px;
    text-align: left;
    justify-content: flex-end;
    flex-flow: row-reverse;
    border-bottom: 1px solid #707070;
    margin-bottom: 10px;
    align-items: center;
  }
  .MuiCardHeader-action {
    margin: 0;
    margin-left: -6px;
    @media all and (max-width: 1024px) {
      align-self: center;
    }
  }
  .MuiCardContent-root {
    padding: 0;
  }
`;

export const TileJobCardUnitWrapper = styled(Card)`
  position: absolute;
  top: 8px;
  right: 10px;
  outline: solid 1px #707070;
  &.MuiPaper-rounded {
    border-radius: 0;
  }
  .MuiCardHeader-root {
    padding: 3px 5px;
    text-align: left;
    justify-content: flex-end;
    background-color: #06639c;
    margin-bottom: 0;
  }
  .MuiCardContent-root {
    padding: 4px 7px;
  }
  .MuiCardContent-root:last-child {
    padding-bottom: 4px;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: Roboto;
  background-color: ${props =>
    (LABEL_COLORS[props.color])};
  visibility: ${props => (props.hide ? 'hidden' : 'visible ')};
`;

export const LabelBox = styled.div`
  display: flex;
  height: 21px;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0px 10px;
  font-size: ${props => !props.isListView && '10px'};
  line-height: 1.1;
  border-radius: 10px;
  background-color: ${props =>
    (LABEL_COLORS[props.color])};
  color: white;
`;

export const SquareLabelBox = styled(LabelWrapper)`
  font-size: 18px;
  padding: 5px 12px;
  border-radius: 2px;
  background-color: ${props =>
    (LABEL_COLORS[props.color])};
  color: white;
`;

export const CardHeaderTitleRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  & h4 {
    margin-right: 17px;
    @media all and (max-width: 1024px) {
      margin-bottom: ${props => (props.haverevision ? '5px' : '0px')};
    }
  }
  
  @media all and (max-width: 1024px), (-ms-high-contrast: active), (-ms-high-contrast: none) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledCardContent = styled(CardContent)`
  text-align: left;
  padding: 10px 0;
`;

export const ContentBlock = styled.div`
  margin-bottom: 12px;
  margin-right: 20px;
`;
export const ContentUnitBlock = styled.div`
  margin: 0;
`;
export const StyledDivider = styled(Divider)`
  background: #707070;
  &.MuiDivider-root {
    height: 20px;
    width: 2px;
    margin: 4px 4px 0 4px;
    @media all and (max-width: 1024px) {
      margin: 4px auto;
      transform: rotate(90deg);
    }
  }
`;
export const ContentBlocksWrapper = styled.div`
  
  display: flex;
  @media all and (max-width: 1024px) {
        flex-direction: column;
      }
  padding-bottom: 0px;
`;

export const CardButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const HandDragWrapper = styled.div`
  display: flex;
  cursor: grab;
`;

export const EmptyTablePlaceholder = styled(Typography)`
  color: #425A70 !important;
  font-size: 18px !important;
  font-weight: 400;
`;
