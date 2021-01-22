import  React, { ChangeEvent }  from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Form, FormControl } from 'react-bootstrap';
import { PartnerTypeForm } from './partner-type-form';
import { PartnerType } from '../../api/domain/partner-type.enum';


describe('PartnerTypeForm test', () => {
    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;
    
    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<PartnerTypeForm  
            partnerType={PartnerType.legalEntity}
            />);
    });

    it('test onPartnerTypeChange event', () => {
        let formWrapper = wrapper.find(Form);
        let formControl = formWrapper.find(FormControl);
        formControl.invoke('onChange')!({target: {value: PartnerType.legalEntity}} as ChangeEvent<HTMLInputElement>);
        formWrapper = wrapper.find(Form);
        formControl = formWrapper.find(FormControl);
        expect(formControl.prop('value')).toBe(PartnerType.legalEntity);
    });
});

