
export interface AddressInfo {
    city: string;
    street: string;
    houseNumber: string;
    idx: string;
}

export type AddressInfoValidity = {[key in keyof AddressInfo]?: boolean};

export const validateAddressInfo = (addressInfo: AddressInfo) => {
    const result: AddressInfoValidity = {};
    if (!!addressInfo?.city){
        result.city = true;
    }
    if (!!addressInfo?.houseNumber){
        result.houseNumber = true;
    }
    if (!!addressInfo?.street){
        result.street = true;
    }
    if (!!addressInfo?.idx){
        result.idx = true;
    }
    return result;
}

export const isAddressInfoValid = (info: AddressInfoValidity) => !!info.city && !!info.houseNumber && !!info.street && !!info.idx;