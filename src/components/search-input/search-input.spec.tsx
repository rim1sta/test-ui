import { shallow, ShallowWrapper } from 'enzyme';
import  React, { ChangeEvent }  from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { SearchInput } from './search-input';

jest.mock('lodash', () => ({
    debounce: (fn: Function, timer: number) => (...args: unknown[]) => fn(...args)
}));


describe('SearchInput test', () => {
    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;
    
    

    
    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<SearchInput 
            search="test" 
            searchChange={mockFn}
            />);
    });

    it('test input value', () => {
        let inputGroup = wrapper.find(InputGroup);
        let formControl = inputGroup.find(FormControl);
        formControl.invoke('onChange')!({target: {value: 'foo'}} as ChangeEvent<HTMLInputElement>);
        inputGroup = wrapper.find(InputGroup);
        formControl = inputGroup.find(FormControl);
        expect(formControl.prop('value')).toBe('foo');
    });

});