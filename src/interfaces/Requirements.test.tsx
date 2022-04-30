import {
    addRquirements,
    EMPTY_REQUIREMENTS,
    Requirements
} from "./Requirements";

const REQS1: Requirements = {
    CAHBreadth: 3,
    HCCBreadth: 1,
    SBSBreadth: 4,
    ForeignLanguage: 1,
    LabScience: 5,
    CSCore: 9,
    TechnicalElective: 2,
    CSCapstone: 6
};

const REQS2: Requirements = {
    CAHBreadth: 2,
    HCCBreadth: 7,
    SBSBreadth: 1,
    ForeignLanguage: 8,
    LabScience: 2,
    CSCore: 8,
    TechnicalElective: 1,
    CSCapstone: 8
};

describe("Requirements interface test", () => {
    test("Requirements can be added", () => {
        expect(addRquirements(REQS1, REQS2)).toEqual({
            CAHBreadth: 5,
            HCCBreadth: 8,
            SBSBreadth: 5,
            ForeignLanguage: 9,
            LabScience: 7,
            CSCore: 17,
            TechnicalElective: 3,
            CSCapstone: 14
        });
        expect(addRquirements(REQS1, EMPTY_REQUIREMENTS)).toEqual(REQS1);
    });
});
