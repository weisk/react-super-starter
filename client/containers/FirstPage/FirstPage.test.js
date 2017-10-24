import React from 'react';
import { shallow } from 'enzyme';

import FirstPage from './index';

it('renders without crashing', () => {
  shallow(<FirstPage />);
})

