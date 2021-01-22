import { PasswordEdit } from "./password-edit";
import  React, { ChangeEvent } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Container } from "react-bootstrap";
import { MOCK_DISPATCH } from '../../mocks/mocks';


describe('PasswordEdit test', () => {
    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;



    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<PasswordEdit id="227311" />);
    });

    const getFields = (wrapper: ShallowWrapper) => {
        const password = wrapper.find('.t_password');
        const repeatPassword = wrapper.find('.t_password-repeat');
        return {password, repeatPassword}
    }

    it('test passwords changes', () => {
        let x = getFields(wrapper);
        x.password.invoke('onChange')!({target: {value:'test'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.password.prop('value')).toBe('test'); 
        x = getFields(wrapper);
        x.repeatPassword.invoke('onChange')!({target: {value:'test'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.repeatPassword.prop('value')).toBe('test'); 
    });

    it('test password change request', () => {
        let container = wrapper.find(Container);
        expect(MOCK_DISPATCH).not.toHaveBeenCalled();
        container.find({variant: 'primary'}).invoke('onClick')();
        expect(MOCK_DISPATCH).toHaveBeenCalledWith({"id": "227311", "password": ""});
    });

    
});