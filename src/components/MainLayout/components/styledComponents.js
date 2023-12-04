import styled from 'styled-components';
import Select from '@material-ui/core/Select';

export const StyledSelect = styled(Select)`
  text-transform: uppercase;
  text-align: left;
  background-color: #cecece;
  padding: 0;
  visibility: ${props => (props.ishidden ? 'hidden' : 'visible')};
  &.MuiInputBase-root {
    border: none;
    border-radius: 0;
    font-size: ${props => props.fontSize || '24px'};
    font-weight: 500;
    color: #425a70;
    & svg {
      fill: #425a70;
      }
     @media all and (max-width: 1024px) {
      font-size: 18px;
    }
  }
  &.MuiInputBase-root.Mui-disabled {
    svg {
      fill: rgba(0, 0, 0, 0.38);
    }
  }
  & .MuiSelect-select:focus {
    background-color: #cecece;
  }
`;
