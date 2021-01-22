import { shallow, ShallowWrapper } from 'enzyme';
import  React, { ChangeEvent }  from 'react'; 
import { Container, FormControl, Button } from 'react-bootstrap';
import { PartnerScreen } from './partner-screen';
import { AddressInfoForm } from './address-info-form';
import { ContactInfoForm } from './contact-info-form';
import { PersonalInfoForm } from './personal-info-form';
import { Gender } from '../../api/domain/gender.enum';
import { PartnerType } from '../../api/domain/partner-type.enum';


describe('PartnerScreen test', () => {
    const mockFn: jest.Mock = jest.fn()
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<PartnerScreen 
            partnerUpdate={mockFn}
            />);
    });

    it('onPartnerTypeChange test event', () => {
        let container = wrapper.find(Container);
        let formControl = container.find(FormControl);
        formControl.invoke('onChange')!({target: {value: 'Юридическое лицо'}} as ChangeEvent<HTMLInputElement>);
    });

    it('partnerUpdate request test', () => {
        let container = wrapper.find(Container);
        let addressInfoForm = container.find(AddressInfoForm);
        addressInfoForm.invoke('onAddressInfoChange')!({
            "city": "Москва",
            "street": "Улица 1",
            "houseNumber": "1a",
            "idx": "123123"
          });
        container = wrapper.find(Container);
        let contactInfoForm = container.find(ContactInfoForm);
        contactInfoForm.invoke('onContactInfoChange')!({
        "phone": "+71112223344",
        "email": "test1@test.com"})  
        container = wrapper.find(Container);
        let personalInfo = container.find(PersonalInfoForm) 
        personalInfo.invoke("onPersonalInfoChange")!({
             "firstName": "Петр",
            "lastName": "Петров",
            "middleName": "Петрович",
            "birthDate": "10.10.1978",
            "gender": Gender.male});
        container = wrapper.find(Container);
        expect(mockFn).not.toHaveBeenCalled();
        container.find({variant: 'primary'}).invoke('onClick')();
        expect(mockFn).toHaveBeenCalledWith({
            "addressInfo": {
                "city": "Москва",
                "street": "Улица 1",
                "houseNumber": "1a",
                "idx": "123123"},
            "contactInfo": {
                "phone": "+71112223344",
                "email": "test1@test.com"
            },
            "partnerType": "naturalPerson",
            "personalInfo": {
                "firstName": "Петр",
                "lastName": "Петров",
                "middleName": "Петрович",
                "birthDate": "10.10.1978",
                "gender": Gender.male
            },
          });
    });
    it('selected partnerType test', () => {
        let container = wrapper.find(Container);
        let formControl = container.find(FormControl);
        formControl.invoke('onChange')!({target: {value: PartnerType.naturalPerson}} as ChangeEvent<HTMLInputElement>);  
        container = wrapper.find(Container);
        formControl = container.find(FormControl);
        expect(formControl.prop('value')).toBe(PartnerType.naturalPerson);
        let personalInfoForm = container.find(PersonalInfoForm);
        expect(personalInfoForm.length).toBe(1);
    });
});
