import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-bottom: 25px;
  &::-webkit-input-placeholder {
    color: ${({theme}) => theme.colors.primary};
    }
`;

export default function({onChange, placeholder, ...props}) {
    return (
        <div>
            <InputBase 
            onChange={onChange} 
            placeholder={placeholder}
            {...props}
            />
        </div>
    )
} 

InputBase.defaultProps = {
    value: ''
}

InputBase.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}