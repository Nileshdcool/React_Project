import styled from 'styled-components';

export const FilterPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  background-color: transparent;
`;
export const FilterPanelButtonsWrapper = styled.div`
  display: flex;
  margin: 30px 30px 25px 0;
  justify-content: space-between;
  width: 130px;
   @media all and (max-width: 1024px) {
      width: 110px;
    }
`;
