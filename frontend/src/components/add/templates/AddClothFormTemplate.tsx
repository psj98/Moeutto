import React, { SetStateAction, Dispatch } from 'react';
import AddClothFormOrganism from '../organisms/AddClothFormOrganism';
// import { FormType } from '../../../pages/AddClothPage';

interface Props {
  setStateValue: Dispatch<SetStateAction<FormData>>;
  handleRemoveBG: (imgWithBG: File) => Promise<any>;
}

const AddClothFormTemplate = ({ setStateValue, handleRemoveBG }: Props) => {
  return <AddClothFormOrganism setStateValue={setStateValue} handleRemoveBG={handleRemoveBG} />;
};

export default AddClothFormTemplate;
