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
            "This plan requires " +
                plan.degree.requiredCredits +
                " credits. Your schedule has " +
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
            "This plan requires " +
                plan.degree.requirements.CAHBreadth +
                " credits of creative arts & humanities breadth. Your schedule has " +
                totalRequirements.CAHBreadth +
                " credits."
        ];
    }
    if (totalRequirements.HCCBreadth < plan.degree.requirements.HCCBreadth) {
        result = [
            ...result,
            "This plan requires " +
                plan.degree.requirements.HCCBreadth +
                " credits of history & cultural change breadth. Your schedule has " +
                totalRequirements.HCCBreadth +
                " credits."
        ];
    }
    if (totalRequirements.SBSBreadth < plan.degree.requirements.SBSBreadth) {
        result = [
            ...result,
            "This plan requires " +
                plan.degree.requirements.SBSBreadth +
                " credits of social & behavioral science breadth. Your schedule has " +
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
            "This plan requires " +
                plan.degree.requirements.ForeignLanguage +
                " credits of foreign language. Your schedule has " +
                totalRequirements.ForeignLanguage +
                " credits."
        ];
    }
    if (totalRequirements.LabScience < plan.degree.requirements.LabScience) {
        result = [
            ...result,
            "This plan requires " +
                plan.degree.requirements.LabScience +
                " credits of lab science. Your schedule has " +
                totalRequirements.LabScience +
                " credits."
        ];
    }
    if (totalRequirements.CSCore < plan.degree.requirements.CSCore) {
        result = [
            ...result,
            "This plan requires " +
                plan.degree.requirements.CSCore +
                " credits of computer science core. Your schedule has " +
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
            "This plan requires " +
                plan.degree.requirements.TechnicalElective +
                " credits of technical electives. Your schedule has " +
                totalRequirements.TechnicalElective +
                " credits."
        ];
    }
    if (totalRequirements.CSCapstone < plan.degree.requirements.CSCapstone) {
        result = [
            ...result,
            "This plan requires " +
                plan.degree.requirements.CSCapstone +
                " credits of computer science capstone. Your schedule has " +
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

export const TEST_PLANS: DegreePlan[] = [
    {
        id: 0,
        degree: CISC_BS,
        name: "CS test plan",
        semesters: [
            {
                id: 2,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 108"]), id: 1 },
                    { ...convertCourse(catalog["CISC"]["CISC 304"]), id: 18 },
                    { ...convertCourse(catalog["CISC"]["CISC 367"]), id: 19 }
                ],
                session: "fall",
                year: 2022
            },
            {
                id: 4,
                courses: [
                    { ...convertCourse(catalog["CISC"]["CISC 181"]), id: 5 },
                    { ...convertCourse(catalog["CISC"]["CISC 210"]), id: 6 }
                ],
                session: "spring",
                year: 2023
            }
        ]
    },
    {
        id: 7,
        degree: {
            id: 8,
            name: "MATH Degree",
            requirements: EMPTY_REQUIREMENTS,
            requiredCourses: [],
            requiredCredits: 124
        },
        name: "Math test plan",
        semesters: [
            {
                id: 9,
                courses: [
                    { ...convertCourse(catalog["MATH"]["MATH 241"]), id: 10 }
                ],
                session: "fall",
                year: 2022
            },
            {
                id: 11,
                courses: [
                    { ...convertCourse(catalog["MATH"]["MATH 242"]), id: 12 },
                    { ...convertCourse(catalog["MATH"]["MATH 210"]), id: 13 }
                ],
                session: "spring",
                year: 2023
            },
            {
                id: 14,
                courses: [
                    { ...convertCourse(catalog["MATH"]["MATH 243"]), id: 15 }
                ],
                session: "fall",
                year: 2023
            }
        ]
    }
];
