import styled from 'styled-components';

export const IsCheckedIconWrapper = styled.div`
  visibility: ${props => (props.isHidden ? 'hidden' : 'visible')};
  & svg {
    fill: #0969a6;
    width: 20px;
    height: 20px;
  }
`;
