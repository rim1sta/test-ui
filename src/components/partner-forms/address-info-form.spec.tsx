import { shallow, ShallowWrapper } from 'enzyme';
import  React, { ChangeEvent }  from 'react'; 
import { AddressInfoForm } from './address-info-form';


describe('AddressInfoForm test', () => {
    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<AddressInfoForm  
            addressInfo={{city: 'SPb', street: 'nevskiy', houseNumber: '413', idx: '194100'}}
            onAddressInfoChange={mockFn}
            validationInfo={{city: true, street: true, houseNumber: true, idx: true}}
            />);
    });

    const getFields = (wrapper: ShallowWrapper) => {
        const city = wrapper.find(".t_address-city");
        const street = wrapper.find(".t_address-street");
        const houseNumber = wrapper.find(".t_address-houseNumber");
        const idx = wrapper.find(".t_address-idx");
        return {city, street, houseNumber, idx};
    }

    it('onCityChange test event', () => {
        let x = getFields(wrapper);
        x.city.invoke('onChange')!({target: {value: 'SPb'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.city.prop('value')).toBe('SPb');
    });

    it('onStreetChange test event', () => {
        let x = getFields(wrapper);
        x.street.invoke('onChange')!({target: {value: 'nevskiy'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.street.prop('value')).toBe('nevskiy');
    });

    it('onHouseNumberChange test event', () => {
        let x = getFields(wrapper);
        x.houseNumber.invoke('onChange')!({target: {value: '413'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.houseNumber.prop('value')).toBe('413');
    });

    it('onIdxChange test event', () => {
        let x = getFields(wrapper);
        x.idx.invoke('onChange')!({target: {value: '194100'}} as ChangeEvent<HTMLInputElement>);
        x = getFields(wrapper);
        expect(x.idx.prop('value')).toBe('194100');
    });

    it('test addressInfo form validation', () => {
        let x = getFields(wrapper);
        expect(x.idx.prop('isInvalid')).toBeFalsy();
        expect(x.city.prop('isInvalid')).toBeFalsy();
        expect(x.houseNumber.prop('isInvalid')).toBeFalsy();
        expect(x.street.prop('isInvalid')).toBeFalsy();
        wrapper.setProps({validationInfo: {city: false, street: false, idx: false, houseNumber: false}});
        x = getFields(wrapper);
        expect(x.idx.prop('isInvalid')).toBeTruthy();
        expect(x.city.prop('isInvalid')).toBeTruthy();
        expect(x.houseNumber.prop('isInvalid')).toBeTruthy();
        expect(x.street.prop('isInvalid')).toBeTruthy();
    });
});