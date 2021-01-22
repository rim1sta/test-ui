import { shallow, ShallowWrapper } from 'enzyme';
import  React, { ChangeEvent }  from 'react'; 
import { PersonalInfoForm } from './personal-info-form';
import { Gender } from '../../api/domain/gender.enum';
import DatePicker from "react-datepicker";



describe('PersonalInfoForm test', () => {
    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;


    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<PersonalInfoForm  
            onPersonalInfoChange={mockFn}
            personalInfo={{lastName: 'ivanov', firstName: 'ivan', middleName: 'ivanov', birthDate: '21.12.90', gender: Gender.male}}
            />);
    });

    const getFields = (wrapper: ShallowWrapper) => {
        const lastName = wrapper.find(".t_personal-lastName");
        const firstName = wrapper.find(".t_personal-firstName");
        const middleName = wrapper.find(".t_personal-middleName");
        const gender = wrapper.find(".t_personal-gender");
        return {lastName, firstName, middleName, gender}
    };
    
    it('onLastNameChange', () => {
        let x = getFields(wrapper);
        x.lastName.invoke('onChange')!({target: {value: 'ivanov'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.lastName.prop('value')).toBe('ivanov');
    });

    it('onFirstNameChange', () => {
        let x = getFields(wrapper);
        x.firstName.invoke('onChange')!({target: {value: 'ivan'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.firstName.prop('value')).toBe('ivan');
    });

    it('onMiddleNameChange', () => {
        let x = getFields(wrapper);
        x.middleName.invoke('onChange')!({target: {value: 'ivanov'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.middleName.prop('value')).toBe('ivanov');
    });

    /* it('onBirthDateChange', () => {
        let formWrapper = wrapper.find(Form);
        let datePicker = formWrapper.find(DatePicker);
        datePicker.invoke('onChange')!('21.12.12' as Date);
    }); */

    it('onGenderChange', () => {
        let x = getFields(wrapper);
        x.gender.invoke('onChange')!({target: {value: Gender.male}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.gender.prop('value')).toBe(Gender.male);
    });

    it('test personalInfo form validation', () => {
        let x = getFields(wrapper); 
        expect(x.firstName.prop('isInvalid')).toBeFalsy();
        expect(x.middleName.prop('isInvalid')).toBeFalsy();
        expect(x.lastName.prop('isInvalid')).toBeFalsy();
        expect(x.gender.prop('isInvalid')).toBeFalsy();
        wrapper.setProps({validationInfo: {firstName: false, middleName: false, gender: false, lastName: false}});
        x = getFields(wrapper);
        expect(x.firstName.prop('isInvalid')).toBeTruthy();
        expect(x.middleName.prop('isInvalid')).toBeTruthy();
        expect(x.lastName.prop('isInvalid')).toBeTruthy();
        expect(x.gender.prop('isInvalid')).toBeTruthy();
    });
});