import { shallow, ShallowWrapper } from 'enzyme';
import  React, { ChangeEvent }  from 'react'; 
import { CompanyInfoForm } from './company-info-form';



describe('CompanyInfoForm', () => {
    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<CompanyInfoForm 
            onCompanyInfoChange={mockFn}
            validationInfo={{numEmployees: true, name: true, foundationYear:true}}
            />);
    });

    const getFields = (wrapper: ShallowWrapper) => {
        const name = wrapper.find(".t_company-name");
        const foundationYear = wrapper.find(".t_company-foundationYear");
        const numEmployees = wrapper.find(".t_company-numEmployes");
        return {name, foundationYear, numEmployees};
    };

    it('onNameChange', () => {
        let x = getFields(wrapper);
        x.name.invoke('onChange')!({target: {value: 'Short'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.name.prop('value')).toBe('Short');
    });

    it('onFoundationYearChange', () => {
        let x = getFields(wrapper);
        x.foundationYear.invoke('onChange')!({target: {value: '2010'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.foundationYear.prop('value')).toBe(2010);
    });

    it('onNumEmpoyeesChange', () => {
        let x = getFields(wrapper);
        x.numEmployees.invoke('onChange')!({target: {value: '34'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.numEmployees.prop('value')).toBe(34);
    });

    it('test companyInfoForm validation', () => {
        let x = getFields(wrapper);
        expect(x.numEmployees.prop('isInvalid')).toBeFalsy();
        expect(x.name.prop('isInvalid')).toBeFalsy();
        expect(x.foundationYear.prop('isInvalid')).toBeFalsy();
        wrapper.setProps({validationInfo: {numEmployees: false, name: false, foundationYear:false}});
        x = getFields(wrapper);
        expect(x.numEmployees.prop('isInvalid')).toBeTruthy();
        expect(x.name.prop('isInvalid')).toBeTruthy();
        expect(x.foundationYear.prop('isInvalid')).toBeTruthy();
    });
});