import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateFormData } from '@forms/form-redux';

const transformFields = (x) => x;
const formSubmit = () => () => ({ type: 'some_scope/SUBMIT' });
const onExit = () => () => ({ type: 'some_scope/EXIT' });

export const useSubmit = (formId) => {
  const dispatch = useDispatch();

  const callback = useCallback(
    async (fieldsValues) => {
      dispatch(updateFormData(formId, fieldsValues));

      const processedFields = transformFields(fieldsValues);

      return dispatch(formSubmit(processedFields));
    },
    [dispatch, formId]
  );

  const cleanCallback = useCallback(() => dispatch(onExit()), [dispatch]);

  return [callback, cleanCallback];
};
