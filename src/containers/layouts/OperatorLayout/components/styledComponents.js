import styled from 'styled-components';
import { StyledMenuItem } from '../../JobDetails/SupervisorView/components/styledComponents';

export const MaterialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  padding: 50px;
  box-sizing: border-box;
  overflow-y: auto;
`;
export const MaterialsItemsRowWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 310px;
  flex-shrink: 0;
  justify-content: space-between;
  &:first-child {
    margin-bottom: 50px;
  }
`;

export const MaterialsPopupWrapper = styled.div`
  width: 320px;
  height: 300px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  outline: 1px solid #707070;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const MaterialsPopupWrapperHeader = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 20px 13px 20px 15px;
  background-color: #93c6f4;
  background-image: linear-gradient(to bottom, #93c6f4, #064289);
`;

export const MaterialsPopupItemsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 320px;
  margin: 20px 0;
  & .MuiMenuItem-root {
    display: flex;
    min-height: 40px;
  }
  & .MuiTypography-body2{
    line-height: 1.17;
    padding: 0 10px;
    text-align: justify;
    white-space: pre-wrap;
  }
`;

export const MaterialsPopupListItem = styled(StyledMenuItem)`
  &.MuiMenuItem-root{
    display: flex;
    white-space: pre-wrap;
    cursor: default;
    color: #425a70;
    padding: 0;
    margin: 0 20px;
    &.MuiListItem-gutters{
      padding-left: 0;
    }
    &.MuiListItem-button:hover{
      background-color: transparent;
    }
  }
`;
