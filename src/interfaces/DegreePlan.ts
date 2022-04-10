import { Degree } from "./Degree";
import { Semester } from "./Semester";

export interface DegreePlan {
    id: number;
    degree: Degree;
    name: string;
    semesters: Semester[];
}

export const TEST_PLANS: DegreePlan[] = [
    {
        id: 0,
        degree: {
            id: 1,
            name: "CS Degree",
            requirements: [],
            requiredCredits: 124
        },
        name: "CS test plan",
        semesters: [
            {
                id: 2,
                courses: [
                    {
                        id: 3,
                        name: "intro to computer science",
                        courseNumber: "CISC108",
                        credits: 3,
                        prereqs: [],
                        requirementsFulfilled: [],
                        sections: []
                    }
                ],
                session: "fall",
                year: 2022
            },
            {
                id: 4,
                courses: [
                    {
                        id: 5,
                        name: "intro to computer science 2",
                        courseNumber: "CISC181",
                        credits: 3,
                        prereqs: ["CISC108"],
                        requirementsFulfilled: [],
                        sections: []
                    },
                    {
                        id: 6,
                        name: "systems programming",
                        courseNumber: "CISC210",
                        credits: 3,
                        prereqs: ["CISC108"],
                        requirementsFulfilled: [],
                        sections: []
                    }
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
            requirements: [],
            requiredCredits: 124
        },
        name: "CS test plan",
        semesters: [
            {
                id: 9,
                courses: [
                    {
                        id: 10,
                        name: "CALCULUS 1",
                        courseNumber: "MATH241",
                        credits: 3,
                        prereqs: [],
                        requirementsFulfilled: [],
                        sections: []
                    }
                ],
                session: "fall",
                year: 2022
            },
            {
                id: 11,
                courses: [
                    {
                        id: 12,
                        name: "calculus 2",
                        courseNumber: "MATH242",
                        credits: 3,
                        prereqs: ["MATH241"],
                        requirementsFulfilled: [],
                        sections: []
                    },
                    {
                        id: 13,
                        name: "discrete math",
                        courseNumber: "MATH210",
                        credits: 3,
                        prereqs: [],
                        requirementsFulfilled: [],
                        sections: []
                    }
                ],
                session: "spring",
                year: 2023
            },
            {
                id: 14,
                courses: [
                    {
                        id: 15,
                        name: "calculus 3",
                        courseNumber: "MATH243",
                        credits: 3,
                        prereqs: ["MATH241"],
                        requirementsFulfilled: [],
                        sections: []
                    }
                ],
                session: "fall",
                year: 2023
            }
        ]
    }
];
