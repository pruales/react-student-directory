import styled from 'styled-components';

export const TextField = styled.input`
  outline: 0;
  border-width: 0 0 2px;
  border-color: silver;
  width: ${props => props.width};
  font-size: 18px;
  padding: 8px;
  margin-bottom: 18px;
`;