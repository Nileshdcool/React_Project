import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { LABEL_COLORS } from '../../../constants/index';

export const JobLineTitle = styled.p`
  text-align: left;
  height: 32px;
  margin: 20px 20px 0px;
  font-family: Roboto;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: #425a70;
`;

export const CustomTableContainer = styled(TableContainer)`
  margin: 0 0 10px;
  border: solid 1px #979797;
  &.MuiPaper-rounded {
    border-radius: 0px;
  }
  &.MuiPaper-elevation1 {
    box-shadow: none;
  }
`;

export const CustomTable = styled(Table)`
  position: relative;
  min-width: 650px;
  padding: 0px 8px 10px;
  z-index: 1;
`;
export const HideTableBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  transition: opacity 0.5s ease-out;
  background-color: #e5e5e5;
  outline: 1px dashed #707070;
  visibility: ${(props) => (props.isondrag ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isondrag ? ' 0.8' : '0')};
`;

export const CustomTableBody = styled(TableBody)`
  //height: 200px;
  z-index: 10;
  overflow-y: auto;
  position: relative;
`;

export const EmptyTablePlaceholder = styled(Typography)`
  margin-bottom: 30px !important;
  color: #425a70 !important;
  font-size: 18px !important;
  font-weight: 400;
`;

export const CustomTableRow = styled(TableRow)`
  &.MuiTableRow-root {
    max-height: 50px;
    box-sizing: border-box;
  }
  &:nth-child(2n) {
    background-color: #e2f3fc;
  }
  &:nth-child(2n + 1) {
    background-color: #ffffff;
  }
`;

export const HeaderCell = styled(TableCell)`
  &.MuiTableCell-head {
    color: #425a70;
    background: #ffffff;
    font-size: 18px;
    border-top: none;
    border-bottom: none;
    padding: 5px;
    cursor: ${(props) => props.cursor};

    & > span.MuiTableSortLabel-root {
      display: table-cell;
      word-break: normal;
    }

    @media all and (width: 1920px) {
      padding: 16px;
      width: ${(props) => props.minwidth};
    }
  }
`;

export const UnclicableItem = styled.div`
  margin-right: 20px;
`;

export const StyledCell = styled(TableCell)`
  &.MuiTableCell-root {
    font-size: 16px;
    color: ${(props) => (props.isInProgress ? '#ffffff' : '#425a70')};
    border-top: none;
    border-bottom: none;
    padding: 0 14px;
  }
  & span {
    padding: 2px 4px;
    ${(props) =>
      props.isInProgress && `background-color: ${LABEL_COLORS.green}`};
  }
`;

export const TextCutter = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 180px;
`;

export const SortingIcon = styled(TableSortLabel)`
  &.MuiTableSortLabel-root.MuiTableSortLabel-active,
  .MuiTableSortLabel-root:hover,
  .MuiTableSortLabel-icon {
    margin: 0;
    color: #425a70;
  }
`;
