import { catalog } from "../Compontents/readJSON";
import { convertCourse, Course } from "./Course";
import { Degree } from "./Degree";
import { DegreePlan, getCourses, getUnfilledRequirements } from "./DegreePlan";

const DEGREE: Degree = {
    id: 0,
    name: "",
    requirements: {
        CAHBreadth: 0,
        HCCBreadth: 0,
        SBSBreadth: 3,
        ForeignLanguage: 0,
        LabScience: 0,
        CSCore: 6,
        TechnicalElective: 0,
        CSCapstone: 0
    },
    requiredCourses: [["CISC 106"], ["CISC 181", "CISC 210"]],
    requiredCredits: 6
};

const PLAN1: DegreePlan = {
    id: 0,
    degree: DEGREE,
    name: "",
    semesters: [
        {
            id: 0,
            courses: [convertCourse(catalog["CISC"]["CISC 106"])],
            session: "winter",
            year: 8
        },
        {
            id: 0,
            courses: [convertCourse(catalog["CISC"]["CISC 181"])],
            session: "fall",
            year: 10
        }
    ]
};

const PLAN2: DegreePlan = {
    id: 0,
    degree: DEGREE,
    name: "",
    semesters: [
        {
            id: 0,
            courses: [convertCourse(catalog["LING"]["LING 101"])],
            session: "winter",
            year: 8
        }
    ]
};

describe("Degree Plan Tests", () => {
    test("getCourses can get courses from all semesters of a plan", () => {
        expect(
            getCourses(PLAN1).find(
                (course: Course): boolean => course.code === "CISC 106"
            )
        ).not.toEqual(undefined);
        expect(
            getCourses(PLAN1).find(
                (course: Course): boolean => course.code === "CISC 181"
            )
        ).not.toEqual(undefined);
        expect(
            getCourses(PLAN1).find(
                (course: Course): boolean => course.code === "LING 101"
            )
        ).toEqual(undefined);
    });
    test("getUnfilledRequirements produces a message if there are not enough total credits", () => {
        expect(
            getUnfilledRequirements(PLAN1).find((string: string): boolean =>
                string.includes("total credits")
            )
        ).toEqual(undefined);
        expect(
            getUnfilledRequirements(PLAN2).find((string: string): boolean =>
                string.includes("total credits")
            )
        ).not.toEqual(undefined);
    });
    test("getUnfilledRequirements produces a message if there are not enough credits in a particular category", () => {
        expect(
            getUnfilledRequirements(PLAN1).find((string: string): boolean =>
                string.includes(
                    "credits of social & behavioral science breadth"
                )
            )
        ).not.toEqual(undefined);
        expect(
            getUnfilledRequirements(PLAN2).find((string: string): boolean =>
                string.includes(
                    "credits of social & behavioral science breadth"
                )
            )
        ).toEqual(undefined);
        expect(
            getUnfilledRequirements(PLAN1).find((string: string): boolean =>
                string.includes("credits of computer science core")
            )
        ).toEqual(undefined);
        expect(
            getUnfilledRequirements(PLAN2).find((string: string): boolean =>
                string.includes("credits of computer science core")
            )
        ).not.toEqual(undefined);
    });
    test("getUnfilledRequirements produces a message if a required course is not taken", () => {
        expect(
            getUnfilledRequirements(PLAN1).find((string: string): boolean =>
                string.includes("CISC 106")
            )
        ).toEqual(undefined);
        expect(
            getUnfilledRequirements(PLAN2).find((string: string): boolean =>
                string.includes("CISC 106")
            )
        ).not.toEqual(undefined);
    });
    test("getUnfilledRequirements produces a message if no courses from a required set of courses is taken", () => {
        expect(
            getUnfilledRequirements(PLAN1).find((string: string): boolean =>
                string.includes("CISC 181 or CISC 210")
            )
        ).toEqual(undefined);
        expect(
            getUnfilledRequirements(PLAN2).find((string: string): boolean =>
                string.includes("CISC 181 or CISC 210")
            )
        ).not.toEqual(undefined);
    });
});
