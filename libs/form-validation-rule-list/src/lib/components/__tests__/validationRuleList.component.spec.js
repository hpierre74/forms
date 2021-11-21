import { screen, render } from '@testing-library/react';
import _ from 'lodash';

import ValidationRuleList from '../validationRuleList.component';
import { rule } from '../../rule';
import { DotText } from '../dotText.component';

jest.unmock('../dotTextList.component');
jest.unmock('../dotText.component');
jest.unmock('../../rule');
jest.unmock('../validationRuleList.component');

describe('<ValidationRuleList />', () => {
  let props;
  let lengthHelper;
  let fooHelper;

  const getWrapper = async () => render(<ValidationRuleList {...props} />);

  beforeEach(() => {
    lengthHelper = rule('Length helper', (x) => x.length < 10);
    fooHelper = rule('Foo helper', (x) => !!x);
    props = {
      weightByRulesClassnames: {},
      colorByRulesClassnames: {},
      rules: []
    };
  });

  it('should render validation-rule-list component with no list', async () => {
    await render(<ValidationRuleList {...props} />);

    expect(screen.queryByRole('list')).toBeNull();
  });

  it('should have created a list of the same length of the helpers array', async () => {
    props.rules = [lengthHelper, fooHelper];

    await getWrapper();

    expect(screen.queryByRole('list').children).toHaveLength(
      props.rules.length
    );
  });

  it('should have passed componentProp to list as attribute in place of items', async () => {
    props.rules = [lengthHelper];
    props.componentProp = 'something';

    await getWrapper();

    expect(screen.queryByRole('list').children).toHaveLength(0);
    expect(screen.queryByRole('list').getAttribute('something')).toBeDefined();
  });

  it('should use provided component to display list', async () => {
    props.component = ({ something }) => <ul>{_.map(something, DotText)}</ul>;
    props.rules = [fooHelper, lengthHelper];
    props.componentProp = 'something';

    await getWrapper();

    expect(screen.queryByRole('list').children).toHaveLength(
      props.rules.length
    );
    expect(screen.queryByRole('list').getAttribute('something')).toBeNull();
  });

  it('should pass corresponding class for colors and font-weight to item', async () => {
    props.rules = [lengthHelper];
    props.weightByRulesClassnames = {
      0: 'with-idle-weight',
      1: 'with-complete-weight',
      2: 'with-incomplete-weight'
    };
    props.colorByRulesClassnames = {
      0: 'with-idle-color',
      1: 'with-complete-color',
      2: 'with-incomplete-color'
    };

    await getWrapper();

    expect(screen.getByRole('listitem').getAttribute('class')).toBe(
      'validation-rule-li with-idle-weight with-idle-color'
    );
  });

  it('should always set the default state color when no check function are passed', async () => {
    const ruleWithoutCheckFunction = rule('awesome key');
    props.rules = [ruleWithoutCheckFunction];
    props.colorByRulesClassnames = {
      0: 'with-idle-color',
      1: 'with-complete-color',
      2: 'with-incomplete-color'
    };

    await getWrapper();

    expect(screen.getByRole('listitem').getAttribute('class')).toContain(
      'with-idle-color'
    );
  });

  it('should return the complete status when rule evaluates to true and value prop has length superior than 0', async () => {
    const ruleAlwaysTrue = rule('awesome key', () => true);
    props.rules = [ruleAlwaysTrue];
    props.value = 'yolo';
    props.colorByRulesClassnames = {
      0: 'with-idle-color',
      1: 'with-complete-color',
      2: 'with-incomplete-color'
    };

    await getWrapper();

    expect(screen.getByRole('listitem').getAttribute('class')).toContain(
      'with-complete-color'
    );
  });

  it('should return the idle status when rule evaluates to true but value prop length is 0', async () => {
    const ruleAlwaysTrue = rule('awesome key', () => true);
    props.rules = [ruleAlwaysTrue];
    props.value = '';
    props.colorByRulesClassnames = {
      0: 'with-idle-color',
      1: 'with-complete-color',
      2: 'with-incomplete-color'
    };

    await getWrapper();

    expect(screen.getByRole('listitem').getAttribute('class')).toContain(
      'with-idle-color'
    );
  });

  it('should return the idle status when rule evaluates to true but value prop length is undefined', async () => {
    const ruleAlwaysTrue = rule('awesome key', () => true);
    props.rules = [ruleAlwaysTrue];
    props.colorByRulesClassnames = {
      0: 'with-idle-color',
      1: 'with-complete-color',
      2: 'with-incomplete-color'
    };

    await getWrapper();

    expect(screen.getByRole('listitem').getAttribute('class')).toContain(
      'with-idle-color'
    );
  });
});
