import React, { SetStateAction, Dispatch } from 'react';
import AddClothFormOrganism from '../organisms/AddClothFormOrganism';
// import { FormType } from '../../../pages/AddClothPage';

interface Props {
  setStateValue: Dispatch<SetStateAction<FormData>>;
}

const AddClothFormTemplate = ({ setStateValue }: Props) => {
  return <AddClothFormOrganism setStateValue={setStateValue} />;
};

export default AddClothFormTemplate;
