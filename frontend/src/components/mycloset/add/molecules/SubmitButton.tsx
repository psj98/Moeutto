import StyledButton from '../atoms/Button';

const SubmitButton = ({ onChange }) => {
  return <StyledButton value="제출하기" onClick={onChange} />;
};

export default SubmitButton;
