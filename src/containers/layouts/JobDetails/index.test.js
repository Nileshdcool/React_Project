import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { mount, configure, shallow } from 'enzyme';

import { jobDetailsData } from '../../../constants/mockData';
import NavigationPanel from './PlannerView/components/NavigationPanel';
import { jobStatuses } from '../../../constants';
import Select from '../../../components/DropDownSelect';

configure({ adapter: new Adapter() });

describe('>>> Navigation Panel >', () => {
  const data = jobDetailsData;
  const component = <NavigationPanel data={data} />;
  it(' -- right setting info data', () => {
    const wrapper = mount(component);
    const resultForCompare = [
      'so#: 92049140',
      'wo#: 8430952',
      'customer#: TECHNIP USA INC',
      'description#: COOLSTAR-15-ARIA G-1021A, G-1021B',
    ];
    const expected = wrapper.find('h6').map(item => item.text());
    expect(expected).toEqual(resultForCompare);
  });
  it(' -- navigation panel snapshot', () => {
    const renderedValue = renderer.create(component).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
  it(' -- navigation panel have 4 buttons, 2 FontAwesomeIcons, used icons - arrow-left, home', () => {
    const wrapper = mount(component);
    const navigationPanelIcons = wrapper.find('FontAwesomeIcon').map(item => item.prop('icon'));
    const panelIcons = navigationPanelIcons.map(item => item.iconName);
    const expectedResult = ['arrow-left', 'home'];

    expect(wrapper.find('button').length).toBe(4);
    expect(wrapper.find('FontAwesomeIcon').length).toBe(2);
    expect(panelIcons).toEqual(expectedResult);
  });
});

// describe('>>> Select component >', () => {
//   it(' -- Select is visible', () => {
//     const selectProps = {
//       selectedJobStatus: '',
//       queuePosition: 'newJobs',
//     };
//     const component = (
//       <Select
//         value={selectProps.selectedJobStatus}
//         width={250}
//         onChange={() => {}}
//         displayEmpty
//         variant="outlined"
//         items={jobStatuses}
//         ishidden={selectProps.queuePosition !== 'newJobs' ? 1 : 0}
//       />
//     );
//     const wrapper = mount(component);
//     expect(wrapper.find('div.MuiInputBase-root')).toHaveStyleRule(
//       'visibility',
//       'visible',
//     );
//   });
//   it(' -- Select is hidden', () => {
//     const selectProps = {
//       selectedJobStatus: '',
//       queuePosition: 'stagedJobs',
//     };
//     const component = (
//       <Select
//         value={selectProps.selectedJobStatus}
//         width={250}
//         onChange={() => {}}
//         displayEmpty
//         variant="outlined"
//         items={jobStatuses}
//         ishidden={selectProps.queuePosition !== 'newJobs' ? 1 : 0}
//       />
//     );
//     const wrapper = mount(component);
//     expect(wrapper.find('div.MuiInputBase-root')).toHaveStyleRule(
//       'visibility',
//       'hidden',
//     );
//   });
//   it('selected value, default value, items number and items text', () => {
//     const selectProps = {
//       selectedJobStatus: '',
//       queuePosition: 'newJobs',
//     };
//     const onChange = jest.fn();
//     const component = (
//       <Select
//         value={selectProps.selectedJobStatus}
//         width={250}
//         onChange={onChange}
//         displayEmpty
//         variant="outlined"
//         items={jobStatuses}
//         ishidden={selectProps.queuePosition !== 'newJobs' ? 1 : 0}
//       />
//     );
//     const wrapper = shallow(component);
//     expect(wrapper.prop('value')).toBe('');
//     wrapper.simulate('change', 'waiting');
//     expect(onChange).toBeCalledWith('waiting');
//     expect(wrapper.children().length).toBe(4);
//     expect(wrapper.children().map(item => item.text())).toEqual(['Set job status', 'Allocated', 'Waiting', 'Drawing Released']);
//   });
// });
