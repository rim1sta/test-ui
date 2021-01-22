import { shallow, ShallowWrapper } from 'enzyme';
import  React, { ChangeEvent }  from 'react'; 
import { Form } from 'react-bootstrap';
import { ContactInfoForm } from './contact-info-form';



describe('ContactInfoForm test', () => {
    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;


    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<ContactInfoForm  
            contactInfo={{email: 'rimista@mail.ru', phone: '89213904038'}}
            onContactInfoChange={mockFn}
            validationInfo={{email: true, phone: true}}
            />);
    });

    const getFields = (wrapper: ShallowWrapper) => {
        const email = wrapper.find('.t_contact-email');
        const phone = wrapper.find('.t_contact-phone');
        return {email, phone};
    }

    it('test onEmailChange event', () => {
        let formWrapper = wrapper.find(Form);
        getFields(formWrapper).email.invoke('onChange')!({target: {value: 'foo@mail.ru'}} as ChangeEvent<HTMLInputElement>);
        formWrapper = wrapper.find(Form);
        expect(getFields(formWrapper).email.prop('value')).toBe('foo@mail.ru');
    });

    it('test onPhoneChange event', () => {
        let formWrapper = wrapper.find(Form);
        getFields(formWrapper).phone.invoke('onChange')!({target: {value: '89213904038'}} as ChangeEvent<HTMLInputElement>);
        formWrapper = wrapper.find(Form);
        expect(getFields(formWrapper).phone.prop('value')).toBe('89213904038');
    });

    it('test contactInfo from validation', () => {
        let x = getFields(wrapper);
        expect(x.email.prop('isInvalid')).toBeFalsy();
        expect(x.phone.prop('isInvalid')).toBeFalsy();
        wrapper.setProps({validationInfo: {email: false, phone: false}})
        x = getFields(wrapper);
        expect(x.email.prop('isInvalid')).toBeTruthy();
        expect(x.phone.prop('isInvalid')).toBeTruthy();
    });

});