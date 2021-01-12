import { ModalWindow } from './modal-window';
import  React  from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Modal } from 'react-bootstrap';




describe('ModalWindow component', () => {

    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<ModalWindow text="" onClose={mockFn}/>);
    });


    it('test body text', () => {
        let body = wrapper.find(Modal.Body);
        let bodyText = body.find('p');
        expect(bodyText.text()).toBe("");

        wrapper.setProps({text: 'abcdef'});
         
        body = wrapper.find(Modal.Body);
        bodyText = body.find('p');
        
        expect(bodyText.text()).toBe('abcdef')      
    });
    it('test button arg true', () => {
        expect(mockFn).not.toHaveBeenCalled();
        wrapper.find({variant: 'primary'}).invoke('onClick')();
        expect(mockFn).toHaveBeenCalledWith(true);
    });
    it('test button arg false', () => {
        expect(mockFn).not.toHaveBeenCalled();
        wrapper.find({variant: 'secondary'}).invoke('onClick')();
        expect(mockFn).toHaveBeenCalledWith(false);
    });
});

