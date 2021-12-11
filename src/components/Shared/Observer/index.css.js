import styled from 'styled-components';

export const InnerDiv = styled.div`
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: ${props =>
    `opacity ${(props.animationTime || 1000) + 'ms'} ${props.transition ||
      'cubic-bezier(0.64, 0.04, 0.35, 1)'} ${(props.delay || 0) + 'ms'}`};
`;
