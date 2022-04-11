import { Degree } from "./Degree";
import { Semester } from "./Semester";

export interface DegreePlan {
    id: number;
    degree: Degree;
    name: string;
    semesters: Semester[];
}

export const EMPTY_PLAN: DegreePlan = {
    id: 0,
    degree: { id: 0, name: "", requirements: [], requiredCredits: 0 },
    name: "",
    semesters: []
};

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
                        descr: "Introductory CS course for python basics",
                        credits: 3,
                        prereqs: [],
                        restrict: [],
                        breadth: [],
                        type: [],
                        code: "CISC108",
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
                        descr: "An introduction to data structures and complex datat types",
                        credits: 3,
                        prereqs: ["CISC108"],
                        restrict: [],
                        breadth: [],
                        type: [],
                        code: "CISC181",
                        requirementsFulfilled: [],
                        sections: []
                    },
                    {
                        id: 6,
                        name: "systems programming",
                        descr: "Objected oriented programming with java",
                        credits: 3,
                        prereqs: ["CISC108"],
                        restrict: [],
                        breadth: [],
                        type: [],
                        code: "CISC210",
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
        name: "Math test plan",
        semesters: [
            {
                id: 9,
                courses: [
                    {
                        id: 10,
                        name: "CALCULUS 1",
                        descr: "Basics of calculus 1",
                        credits: 3,
                        prereqs: [],
                        restrict: [],
                        breadth: [],
                        type: [],
                        code: "MATH241",
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
                        descr: "Basics of Calculus 2",
                        credits: 3,
                        prereqs: ["MATH241"],
                        restrict: [],
                        breadth: [],
                        type: [],
                        code: "MATH242",
                        requirementsFulfilled: [],
                        sections: []
                    },
                    {
                        id: 13,
                        name: "discrete math",
                        descr: "An intro to discrete mathematics and graph theory",
                        credits: 3,
                        prereqs: [],
                        restrict: [],
                        breadth: [],
                        type: [],
                        code: "MATH210",
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
                        descr: "Intro to calculus 3",
                        credits: 3,
                        prereqs: ["MATH241", "MATH242"],
                        restrict: [],
                        breadth: [],
                        type: [],
                        code: "MATH243",
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
