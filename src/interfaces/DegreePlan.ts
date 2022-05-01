import { convertCourse, Course } from "./Course";
import { CISC_BS, Degree } from "./Degree";
import {
    addRquirements,
    EMPTY_REQUIREMENTS,
    Requirements
} from "./Requirements";
import { Semester } from "./Semester";
import { catalog } from "../Compontents/readJSON";

export interface DegreePlan {
    id: number;
    degree: Degree;
    name: string;
    semesters: Semester[];
}

export function getCourses(plan: DegreePlan): Course[] {
    return plan.semesters.reduce(
        (result: Course[], semester: Semester): Course[] => {
            return [...result, ...semester.courses];
        },
        []
    );
}

export function getUnfilledRequirements(plan: DegreePlan): string[] {
    let result: string[] = [];
    const totalCredits: number = getCourses(plan).reduce(
        (credits: number, course: Course): number => credits + course.credits,
        0
    );
    if (totalCredits < plan.degree.requiredCredits) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requiredCredits +
                " total credits. Your plan has " +
                totalCredits +
                " credits."
        ];
    }
    const totalRequirements: Requirements = getCourses(plan).reduce(
        (requirements: Requirements, course: Course): Requirements =>
            addRquirements(requirements, course.requirementsFulfilled),
        EMPTY_REQUIREMENTS
    );
    if (totalRequirements.CAHBreadth < plan.degree.requirements.CAHBreadth) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requirements.CAHBreadth +
                " credits of creative arts & humanities breadth. Your plan has " +
                totalRequirements.CAHBreadth +
                " credits."
        ];
    }
    if (totalRequirements.HCCBreadth < plan.degree.requirements.HCCBreadth) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requirements.HCCBreadth +
                " credits of history & cultural change breadth. Your plan has " +
                totalRequirements.HCCBreadth +
                " credits."
        ];
    }
    if (totalRequirements.SBSBreadth < plan.degree.requirements.SBSBreadth) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requirements.SBSBreadth +
                " credits of social & behavioral science breadth. Your plan has " +
                totalRequirements.SBSBreadth +
                " credits."
        ];
    }
    if (
        totalRequirements.ForeignLanguage <
        plan.degree.requirements.ForeignLanguage
    ) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requirements.ForeignLanguage +
                " credits of foreign language. Your plan has " +
                totalRequirements.ForeignLanguage +
                " credits."
        ];
    }
    if (totalRequirements.LabScience < plan.degree.requirements.LabScience) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requirements.LabScience +
                " credits of lab science. Your plan has " +
                totalRequirements.LabScience +
                " credits."
        ];
    }
    if (totalRequirements.CSCore < plan.degree.requirements.CSCore) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requirements.CSCore +
                " credits of computer science core. Your plan has " +
                totalRequirements.CSCore +
                " credits."
        ];
    }
    if (
        totalRequirements.TechnicalElective <
        plan.degree.requirements.TechnicalElective
    ) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requirements.TechnicalElective +
                " credits of technical electives. Your plan has " +
                totalRequirements.TechnicalElective +
                " credits."
        ];
    }
    if (totalRequirements.CSCapstone < plan.degree.requirements.CSCapstone) {
        result = [
            ...result,
            "This degree requires " +
                plan.degree.requirements.CSCapstone +
                " credits of computer science capstone. Your plan has " +
                totalRequirements.CSCapstone +
                " credits."
        ];
    }
    const failedCourseRequirements: string[][] =
        plan.degree.requiredCourses.filter(
            (requirment: string[]): boolean =>
                !requirment.reduce(
                    (value: boolean, string: string): boolean =>
                        value ||
                        getCourses(plan).find(
                            (course: Course): boolean => course.code === string
                        ) !== undefined,
                    false
                )
        );
    result = [
        ...result,
        ...failedCourseRequirements.map((requirement: string[]): string =>
            requirement.length === 1
                ? "this degree requires the course " + requirement[0] + "."
                : "this degree requires one of the following courses: " +
                  requirement.join(" or ") +
                  "."
        )
    ];
    return result;
}

export const EMPTY_PLAN: DegreePlan = {
    id: 0,
    degree: {
        id: 0,
        name: "",
        requirements: EMPTY_REQUIREMENTS,
        requiredCourses: [],
        requiredCredits: 0
    },
    name: "",
    semesters: []
};

//default plans
export const TEST_PLANS: DegreePlan[] = [
    {
        id: 0,
        degree: CISC_BS,
        name: "Computer Science Degree Plan",
        semesters: [
            {
                id: 1,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 108"]), id: 2 },
                    { ...convertCourse(catalog["EGGG"]["EGGG 101"]), id: 3 },
                    { ...convertCourse(catalog["ENGL"]["ENGL 110"]), id: 4 },
                    { ...convertCourse(catalog["MATH"]["MATH 241"]), id: 5 },
                    { ...convertCourse(catalog["HIST"]["HIST 106"]), id: 6 },
                    { ...convertCourse(catalog["MUSC"]["MUSC 470"]), id: 7 }
                ],
                session: "fall",
                year: 2022
            },
            {
                id: 8,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 181"]), id: 9 },
                    { ...convertCourse(catalog["CISC"]["CISC 210"]), id: 10 },
                    { ...convertCourse(catalog["MATH"]["MATH 210"]), id: 11 },
                    { ...convertCourse(catalog["MATH"]["MATH 242"]), id: 12 },
                    { ...convertCourse(catalog["ECON"]["ECON 101"]), id: 13 },
                    { ...convertCourse(catalog["LING"]["LING 101"]), id: 14 },
                    { ...convertCourse(catalog["MUSC"]["MUSC 119"]), id: 15 }
                ],
                session: "spring",
                year: 2023
            },
            {
                id: 16,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 220"]), id: 17 },
                    { ...convertCourse(catalog["CISC"]["CISC 260"]), id: 18 },
                    { ...convertCourse(catalog["CHEM"]["CHEM 103"]), id: 19 },
                    { ...convertCourse(catalog["CHEM"]["CHEM 133"]), id: 20 },
                    { ...convertCourse(catalog["MATH"]["MATH 243"]), id: 21 },
                    { ...convertCourse(catalog["MUSC"]["MUSC 470"]), id: 22 }
                ],
                session: "fall",
                year: 2023
            },
            {
                id: 23,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 275"]), id: 24 },
                    { ...convertCourse(catalog["CISC"]["CISC 355"]), id: 25 },
                    { ...convertCourse(catalog["CHEM"]["CHEM 104"]), id: 26 },
                    { ...convertCourse(catalog["CHEM"]["CHEM 134"]), id: 27 },
                    { ...convertCourse(catalog["LING"]["LING 202"]), id: 28 }
                ],
                session: "spring",
                year: 2024
            },
            {
                id: 29,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 320"]), id: 30 },
                    { ...convertCourse(catalog["MATH"]["MATH 349"]), id: 31 },
                    { ...convertCourse(catalog["CISC"]["CISC 361"]), id: 32 },
                    { ...convertCourse(catalog["MUSC"]["MUSC 470"]), id: 33 }
                ],
                session: "fall",
                year: 2024
            },
            {
                id: 35,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 304"]), id: 36 },
                    { ...convertCourse(catalog["CISC"]["CISC 303"]), id: 37 },
                    { ...convertCourse(catalog["MATH"]["MATH 315"]), id: 38 },
                    { ...convertCourse(catalog["ENGL"]["ENGL 410"]), id: 39 },
                    { ...convertCourse(catalog["CISC"]["CISC 484"]), id: 40 }
                ],
                session: "spring",
                year: 2025
            },
            {
                id: 41,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 498"]), id: 42 },
                    { ...convertCourse(catalog["CISC"]["CISC 481"]), id: 43 },
                    { ...convertCourse(catalog["HIST"]["HIST 200"]), id: 44 },
                    { ...convertCourse(catalog["CISC"]["CISC 410"]), id: 34 },

                    {
                        ...convertCourse(catalog["CISC"]["CISC 483"]),
                        id: 45,
                        requirementsFulfilled: {
                            ...EMPTY_REQUIREMENTS,
                            TechnicalElective: 3
                        }
                    }
                ],
                session: "fall",
                year: 2025
            },
            {
                id: 46,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 499"]), id: 47 },
                    { ...convertCourse(catalog["CISC"]["CISC 450"]), id: 48 },
                    { ...convertCourse(catalog["MUSC"]["MUSC 470"]), id: 49 },
                    { ...convertCourse(catalog["CISC"]["CISC 367"]), id: 50 },
                    { ...convertCourse(catalog["CISC"]["CISC 372"]), id: 51 }
                ],
                session: "spring",
                year: 2026
            }
        ]
    },
    {
        id: 107,
        degree: {
            id: 108,
            name: "MATH Degree",
            requirements: EMPTY_REQUIREMENTS,
            requiredCourses: [],
            requiredCredits: 124
        },
        name: "Math test plan",
        semesters: [
            {
                id: 109,
                courses: [
                    { ...convertCourse(catalog["MATH"]["MATH 241"]), id: 110 }
                ],
                session: "fall",
                year: 2022
            },
            {
                id: 111,
                courses: [
                    { ...convertCourse(catalog["MATH"]["MATH 242"]), id: 112 },
                    { ...convertCourse(catalog["MATH"]["MATH 210"]), id: 113 }
                ],
                session: "spring",
                year: 2023
            },
            {
                id: 114,
                courses: [
                    { ...convertCourse(catalog["MATH"]["MATH 243"]), id: 15 }
                ],
                session: "fall",
                year: 2023
            }
        ]
    }
];
