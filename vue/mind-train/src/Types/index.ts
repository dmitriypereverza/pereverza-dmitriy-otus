export interface Operation {
    value: boolean;
    stringDefinition: string;
    title: string;
}

export interface Question {
    operands: any[];
    answers: any[];
    logicalExpr: string[];
    equalValue: number;
}


export interface ActiveInterface {
    value: string;
    active: boolean;
}
