import { Requirements } from "./Requirements";

export interface Degree {
    id: number;
    name: string;
    requirements: Requirements;
    requiredCourses: string[][]; //requiremed courses not covered by the requirements field
    requiredCredits: number;
}
export const CISC_BS: Degree = {
    //custom concentration
    id: 0,
    name: "Computer Science BS",
    requirements: {
        CAHBreadth: 6,
        HCCBreadth: 6,
        SBSBreadth: 6,
        ForeignLanguage: 0,
        LabScience: 12,
        CSCore: 30,
        TechnicalElective: 6,
        CSCapstone: 6
    },
    requiredCourses: [
        ["EGGG 101"],
        ["ENGL 101"],
        ["CISC 106", "CISC 108"], //multiple courses in an array indicates only one has to be taken
        ["CISC 181"],
        ["CISC 210"],
        ["CISC 220"],
        ["CISC 260"],
        ["CISC 275"],
        ["CISC 303"],
        ["CISC 320"],
        ["CISC 361"],
        ["CISC 372"],
        ["MATH 205", "MATH 350"],
        ["MATH 210"],
        ["MATH 241"],
        ["MATH 242"],
        ["UNIV 401", "CISC 498"],
        ["UNIV 402", "CISC 499"],
        ["CISC 355"],
        ["ENGL 312", "ENGL 410"]
    ],
    requiredCredits: 124
};
