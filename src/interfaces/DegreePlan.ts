import { convertCourse, Course } from "./Course";
import { CISC_BS, Degree } from "./Degree";
import { EMPTY_REQUIREMENTS } from "./Requirements";
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
