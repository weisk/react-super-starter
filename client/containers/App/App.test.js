import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import App from './index';

it('renders without crashing', () => {
  shallowWithIntl(<App locale="en"/>);
});
