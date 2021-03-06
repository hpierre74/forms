import {
  COMPLETE_STATE,
  DEFAULT_STATE,
  INCOMPLETE_STATE,
  ClassnamesByStatusNumbers,
  ClassnamesByStatusStrings
} from './constants';
import _ from 'lodash';

export type GetWeightByRulesClassnames = ClassnamesByStatusStrings;

export const getWeightByRulesClassnames = ({
  complete,
  idle,
  incomplete
}: GetWeightByRulesClassnames) => ({
  [COMPLETE_STATE]: complete,
  [INCOMPLETE_STATE]: incomplete,
  [DEFAULT_STATE]: idle
});

export interface GetColorByRulesClassnames extends ClassnamesByStatusStrings {
  colors?: ClassnamesByStatusNumbers;
}

export const getColorByRulesClassnames = ({
  complete,
  incomplete,
  idle,
  colors
}: GetColorByRulesClassnames) =>
  _.merge(
    {
      [DEFAULT_STATE]: idle,
      [COMPLETE_STATE]: complete,
      [INCOMPLETE_STATE]: incomplete
    },
    colors || {}
  );
