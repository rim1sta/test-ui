import { shallow, ShallowWrapper } from 'enzyme';
import  React  from 'react';
import  Pagination  from 'react-bootstrap/Pagination';
import { TablePagination } from './pagination';


describe('Pagination test', () => {
    const mockFn: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        mockFn.mockClear();
        wrapper = shallow(<TablePagination 
            currentPage={1} 
            pageCount={1} 
            changePage={mockFn}
            />);
    });


    it('number of items test', () => {
        let pagination = wrapper.find(Pagination);
        let paginationItems = pagination.find(Pagination.Item);
        expect(paginationItems.length).toBe(1);

        wrapper.setProps({pageCount: 3});

        pagination = wrapper.find(Pagination);
        paginationItems = pagination.find(Pagination.Item);

        expect(paginationItems.length).toBe(3);
    });

    it('test currentPage number', () => {
        wrapper.setProps({pageCount: 3, currentPage: 0});
        let pagination = wrapper.find(Pagination);
        let paginationItems = pagination.find(Pagination.Item);
        expect(paginationItems.at(0).prop('active')).toBeTruthy();
        expect(paginationItems.at(1).prop('active')).toBeFalsy();
        expect(paginationItems.at(2).prop('active')).toBeFalsy();

        wrapper.setProps({currentPage: 1});
        pagination = wrapper.find(Pagination);
        paginationItems = pagination.find(Pagination.Item);
        expect(paginationItems.at(0).prop('active')).toBeFalsy();
        expect(paginationItems.at(1).prop('active')).toBeTruthy();
        expect(paginationItems.at(2).prop('active')).toBeFalsy();

        wrapper.setProps({currentPage: 2});
        pagination = wrapper.find(Pagination);
        paginationItems = pagination.find(Pagination.Item);
        expect(paginationItems.at(0).prop('active')).toBeFalsy();
        expect(paginationItems.at(1).prop('active')).toBeFalsy();
        expect(paginationItems.at(2).prop('active')).toBeTruthy();
    }); 

    it('test first page click', () => {
        wrapper.setProps({pageCount: 3, currentPage: 0});
        let pagination = wrapper.find(Pagination);
        let paginationButtonFirst = pagination.find(Pagination.First);
        expect(mockFn).not.toHaveBeenCalled();
        paginationButtonFirst.simulate('click');
        expect(mockFn).toHaveBeenCalledWith(0);
                     
    });

    it('test prev page click', () => {
        wrapper.setProps({pageCount: 3, currentPage: 0});
        let pagination = wrapper.find(Pagination);
        let paginationButtonPrev = pagination.find(Pagination.Prev);
        expect(mockFn).not.toHaveBeenCalled();
        paginationButtonPrev.simulate('click');
        expect(mockFn).toHaveBeenCalledWith(-1);
    });

    it('test next page click', () => {
        wrapper.setProps({pageCount: 3, currentPage: 0});
        let pagination = wrapper.find(Pagination);
        let paginationButtonNext = pagination.find(Pagination.Next);
        expect(mockFn).not.toHaveBeenCalled();
        paginationButtonNext.simulate('click');
        expect(mockFn).toHaveBeenCalledWith(1);
    });

    it('test last page click', () => {
        wrapper.setProps({pageCount: 3, currentPage: 0});
        let pagination = wrapper.find(Pagination);
        let paginationButtonLast = pagination.find(Pagination.Last);
        expect(mockFn).not.toHaveBeenCalled();
        paginationButtonLast.simulate('click');
        expect(mockFn).toHaveBeenCalledWith(2);
    });
});
