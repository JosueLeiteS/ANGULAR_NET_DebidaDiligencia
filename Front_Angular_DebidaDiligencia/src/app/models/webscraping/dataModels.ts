export interface dataOffshore {
    entity: string;
    jurisdiction: string;
    linkedTo: string;
    dataFrom: string;
}

export interface dataSanction {
    name: string;
    address: string;
    type: string;
    programs: string;
    list: string;
    score: string;
}

export interface dataWorldbank {
    firstName: string;
    address: string;
    country: string;
    periodFrom: string;
    periodTo: string;
    grounds: string;
}