import styled from 'styled-components';

const Form = styled.form`
    display:flex;
    justify-content:space-between;
    flex-direction:column;
`;

Form.Input = styled.input`
    margin-bottom: 16px;
    border: 1px solid ${({theme}) => theme.colors.primary};
    background-color: ${({theme}) => theme.colors.mainBg};
    color: ${({theme}) => theme.colors.primary};
    border-radius: 4px;
    height: 37px;
    padding: 10px;
    &::-webkit-input-placeholder {
    color: ${({theme}) => theme.colors.primary};
    }
`;

Form.Buttom = styled.button`
    border:none;
    background-color: ${({theme}) => theme.colors.secondary};
    color: ${({theme}) => theme.colors.contrastText};
    font-family: 'Lato';
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 14px;
    border-radius: 4px;
    height: 37px;
`;

export default Form;
