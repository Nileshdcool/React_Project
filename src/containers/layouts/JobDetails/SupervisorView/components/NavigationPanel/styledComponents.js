import styled from 'styled-components';

export const NavigationPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: transparent;
`;
export const MainNavigationWrapper = styled.div`
  display: flex;
  width: 134px;
  margin: 30px 0px;
  justify-content: space-between;
  align-items: center;
`;
export const SecondaryNavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 25px;
  margin: 34px 0px;
`;
export const CreateJobBlock = styled.div`
  display: flex;
  visibility: ${props => (props.ishidden ? 'hidden' : 'visible')};
  min-width: 380px;
  justify-content: space-between;
  align-items: center;
`;
export const InformationBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
