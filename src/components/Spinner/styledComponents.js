import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GLOBAL_COLORS } from '../../constants';


export const LoadingSpinnerWrapper = styled.div`
  height: 60px;
  width: 60px;
  top: 50%;
  right: 50%;
  left: 50%;
  position: absolute;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledCircularOuter = styled(CircularProgress)`
    &.MuiCircularProgress-root {
      animation-duration: 450ms;
    }
  & .MuiCircularProgress-svg {
    color: ${GLOBAL_COLORS.primary};
  }
`;
