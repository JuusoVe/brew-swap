import React from 'react';
import { useSelector } from 'react-redux';
import { OfferFormValues } from '../type';
import EditOfferForm from './OfferForm';
import { updateSelectedOffer } from './offerSlice';
import { RootState } from '../rootReducer';



const CreateOffer: React.FC = () => {

  const selectedOffer = useSelector(
    (state: RootState) => state.offers.selectedOffer
  );

  const copiedOfferValues: OfferFormValues = {
    beerName: selectedOffer.beerName,
    description: selectedOffer.description,
    packageSize: selectedOffer.packageSize ? selectedOffer.packageSize : '',
    amount: selectedOffer.amount ? selectedOffer.amount : 2,
    location: '',
    recipeLink: selectedOffer.recipeLink ? selectedOffer.recipeLink : ''
  };

  return (
    <EditOfferForm initValues={copiedOfferValues} actionOnSubmit={updateSelectedOffer}/>
  );
};

export default CreateOffer;