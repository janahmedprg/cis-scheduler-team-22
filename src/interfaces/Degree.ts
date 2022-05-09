import { EMPTY_REQUIREMENTS, Requirements } from "./Requirements";

export interface Degree {
    id: number;
    name: string;
    requirements: Requirements;
    requiredCourses: string[][]; //requiremed courses not covered by the requirements field
    requiredCredits: number;
}

export const EMPTY_DEGREE: Degree = {
    id: 0,
    name: "No Degree",
    requirements: EMPTY_REQUIREMENTS,
    requiredCourses: [],
    requiredCredits: 0
};

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
        ["ENGL 110"],
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
        ["CISC 304", "MATH 349"],
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

export const CISC_BA: Degree = {
    id: 0,
    name: "Computer Science BA",
    requirements: {
        CAHBreadth: 9,
        HCCBreadth: 9,
        SBSBreadth: 9,
        ForeignLanguage: 4,
        LabScience: 7,
        CSCore: 30,
        TechnicalElective: 15,
        CSCapstone: 6
    },
    requiredCourses: [
        ["ENGL 110"],
        [
            //FYS requirements
            "ARSC 116",
            "BHAN 135",
            "BMEG 101",
            "BAUD 110",
            "EDUC 100",
            "EGGG 101",
            "ENSC 101",
            "KAAP 105",
            "KAAP 155",
            "LLCU 111",
            "MAST 100",
            "NURS 100",
            "UNIV 101"
        ],
        ["CISC 106", "CISC 108"],
        ["CISC 181"],
        ["CISC 210"],
        ["CISC 220"],
        ["CISC 260"],
        ["CISC 275"],
        ["MATH 210"],
        ["MATH 241"]
    ],
    requiredCredits: 124
};

export const OFFICIAL_DEGREES: Degree[] = [EMPTY_DEGREE, CISC_BS, CISC_BA];
