/* eslint-disable react-hooks/rules-of-hooks */
import styled from 'styled-components';
import { useTranslate } from '@m6web/react-i18n';

import { getValidationRulesHints } from '@forms/form-builder';
import {
  ValidatedTextField,
  ValidatedPasswordTextField
} from './components/textfield';
import { checkRules } from './components/validation-rule-list/validationRuleList.component';

import { BirthdateInput } from './components/birthdate/birthdateInput.component';

const validationColors = {};

const TextFieldMarginWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
`;

const TextFieldTopMarginWrapper = styled.div`
  margin-top: 20px;
`;

export const dictionary = {
  text: ({ errors, errorMessage, ...props }) => {
    const t = useTranslate();
    const error = errors && errors.type && errorMessage;

    return (
      <TextFieldMarginWrapper>
        <ValidatedTextField
          type="text"
          hasError={!!error}
          errorText={t(error)}
          valid={!!props.value && !error}
          {...props}
          label={t(props.label)}
        />
      </TextFieldMarginWrapper>
    );
  },
  password: ({ errors, validation, ...props }) => {
    const t = useTranslate();
    const rules = getValidationRulesHints({
      t,
      errors,
      validation,
      config: {}
    });
    const hasError = !!checkRules(props.value, rules).length;
    const fieldError = errors && errors.type;
    const isValid = !!(props.value && !hasError && !fieldError);

    return (
      <TextFieldTopMarginWrapper>
        <ValidatedPasswordTextField
          hasError={hasError}
          valid={isValid}
          {...props}
          rules={rules}
          colors={validationColors}
          label={t(props.label)}
        />
      </TextFieldTopMarginWrapper>
    );
  },
  date: ({ errors, validation, label, ...props }) => {
    const t = useTranslate();
    const rules = getValidationRulesHints({
      t,
      errors,
      validation,
      config: {}
    });
    const hasError = !!checkRules(props.value, rules).length;
    const fieldError = errors && errors.type;
    const isValid = !!(props.value && !hasError && !fieldError);

    return (
      <TextFieldMarginWrapper>
        <BirthdateInput
          label={t(label)}
          hasError={hasError}
          valid={isValid}
          rules={rules}
          colors={validationColors}
          {...props}
        />
      </TextFieldMarginWrapper>
    );
  },
  submit: ({ label, ...props }) => {
    const t = useTranslate();

    return (
      <button type="submit" {...props}>
        {t(label)}
      </button>
    );
  }
};
