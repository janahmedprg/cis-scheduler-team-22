import { Requirements } from "./Requirements";

export interface Degree {
    id: number;
    name: string;
    requirements: Requirements;
    requiredCourses: string[]; //requiremed courses not covered by the requirements field
    requiredCredits: number;
}
export const CISC_BS: Degree = {
    //custom concentration
    id: 0,
    name: "Computer Science BS",
    requirements: {
        CAHBreadth: 3,
        HCCBreadth: 3,
        SBSBreadth: 3,
        ForeignLanguage: 0,
        LabScience: 12,
        CSCore: 36,
        TechnicalElective: 6,
        CSCapstone: 6
    },
    requiredCourses: ["EGGG 101", "ENGL 101", "CISC 355"],
    requiredCredits: 124
};
