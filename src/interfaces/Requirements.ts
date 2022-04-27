export interface Requirements {
    /* each field represents the number of credits in that requirement */
    /* breadth fields are abbreviations for 
    Creative Arts and Humanities;
    History and Cultural Change;
    and Social and Behavioral Science
    respectively. */
    CAHBreadth: number;
    HCCBreadth: number;
    SBSBreadth: number;
    ForeignLanguage: number;
    LabScience: number;
    CSCore: number;
    TechnicalElective: number;
    CSCapstone: number;
}

/* these constants exist for easier use in other files */

export const EMPTY_REQUIREMENTS: Requirements = {
    CAHBreadth: 0,
    HCCBreadth: 0,
    SBSBreadth: 0,
    ForeignLanguage: 0,
    LabScience: 0,
    CSCore: 0,
    TechnicalElective: 0,
    CSCapstone: 0
};

export function addRquirements(a: Requirements, b: Requirements) {
    return {
        CAHBreadth: a.CAHBreadth + b.CAHBreadth,
        HCCBreadth: a.HCCBreadth + b.HCCBreadth,
        SBSBreadth: a.SBSBreadth + b.SBSBreadth,
        ForeignLanguage: a.ForeignLanguage + b.ForeignLanguage,
        LabScience: a.LabScience + b.LabScience,
        CSCore: a.CSCore + b.CSCore,
        TechnicalElective: a.TechnicalElective + b.TechnicalElective,
        CSCapstone: a.CSCapstone + b.CSCapstone
    };
}
