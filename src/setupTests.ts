import { Partner } from './api/domain/partner';
import { MOCK_DISPATCH } from './mocks/mocks';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



jest.mock('react-redux', () => ({
    ...jest.requireActual<any>('react-redux'),
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => MOCK_DISPATCH
}));

jest.mock('./store/thunks/user', () => ({
   passwordToEdit: (password: string, id?: string) => ({password, id}) 
}));

jest.mock('./store/thunks/partner', () => ({
    partnerToUpdate: (partner: Partner) => ({partner})
}));