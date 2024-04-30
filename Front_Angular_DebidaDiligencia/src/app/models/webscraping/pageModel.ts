import { dataOffshore, dataSanction, dataWorldbank } from "./dataModels";

export interface pageOffshore {
    count: number;
    response: dataOffshore[];    
}

export interface pageSanction {
    count: number;
    response: dataSanction[];    
}

export interface pageWorldbank {
    count: number;
    response: dataWorldbank[];    
}

  