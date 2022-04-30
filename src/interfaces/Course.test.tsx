import { catalog } from "../Compontents/readJSON";
import { convertCourse } from "./Course";

describe("Course interface tests", () => {
    test("importing a course correctly extracts information from the catalog", () => {
        const CISC106 = convertCourse(catalog["CISC"]["CISC 106"]);
        expect(CISC106.code).toEqual("CISC 106");
        expect(CISC106.name).toEqual("General Computer Science for Engineers");
        expect(CISC106.descr).toEqual(
            "Principles of computer science illustrated and applied through programming in a general-purpose language. Programming projects illustrate computational problems, styles, and issues that arise in engineering."
        );
        expect(CISC106.credits).toEqual(3);
        expect(CISC106.restrict).toEqual("");
        const MUSC470 = convertCourse(catalog["MUSC"]["MUSC 470"]);
        expect(MUSC470.code).toEqual("MUSC 470");
        expect(MUSC470.name).toEqual("Marching Band");
        expect(MUSC470.descr).toEqual(
            "All interested percussionists, colorguard and twirlers must audition. May be repeated for credit. Offered in fall semester only."
        );
        expect(MUSC470.credits).toEqual(1);
        expect(MUSC470.restrict).toEqual(
            "Contact the Director for detailed information. All interested percussionists, colorguard and twirlers must audition. May be repeated for credit. Offered in fall semester only."
        );
    });
    test("importing CAH breadth courses correctly fills in the requirements", () => {
        const MUSC470 = convertCourse(catalog["MUSC"]["MUSC 470"]);
        expect(MUSC470.requirementsFulfilled.CAHBreadth > 0).toEqual(true);
        expect(MUSC470.requirementsFulfilled.HCCBreadth > 0).toEqual(false);
        expect(MUSC470.requirementsFulfilled.SBSBreadth > 0).toEqual(false);
    });
    test("importing HCC breadth courses correctly fills in the requirements", () => {
        const HIST106 = convertCourse(catalog["HIST"]["HIST 106"]);
        expect(HIST106.requirementsFulfilled.CAHBreadth > 0).toEqual(false);
        expect(HIST106.requirementsFulfilled.HCCBreadth > 0).toEqual(true);
        expect(HIST106.requirementsFulfilled.SBSBreadth > 0).toEqual(false);
    });
    test("importing SBS breadth courses correctly fills in the requirements", () => {
        const LING101 = convertCourse(catalog["LING"]["LING 101"]);
        expect(LING101.requirementsFulfilled.CAHBreadth > 0).toEqual(false);
        expect(LING101.requirementsFulfilled.HCCBreadth > 0).toEqual(false);
        expect(LING101.requirementsFulfilled.SBSBreadth > 0).toEqual(true);
    });
    test("importing foreign language courses correctly fills in the requirements", () => {
        const SPAN107 = convertCourse(catalog["SPAN"]["SPAN 107"]);
        expect(SPAN107.requirementsFulfilled.ForeignLanguage > 0).toEqual(true);
    });
    test("importing lab science courses correctly fills in the requirements", () => {
        const PHYS207 = convertCourse(catalog["PHYS"]["PHYS 207"]);
        expect(PHYS207.requirementsFulfilled.LabScience > 0).toEqual(true);
    });
    test("importing CS core courses correctly fills in the requirements", () => {
        const CISC210 = convertCourse(catalog["CISC"]["CISC 210"]);
        expect(CISC210.requirementsFulfilled.CSCore > 0).toEqual(true);
    });
    test("importing CS capstone courses correctly fills in the requirements", () => {
        const CISC499 = convertCourse(catalog["CISC"]["CISC 499"]);
        expect(CISC499.requirementsFulfilled.CSCapstone > 0).toEqual(true);
    });
    test("importing any course correctly fills in typically offered semesters", () => {
        const CISC106 = convertCourse(catalog["CISC"]["CISC 106"]);
        expect(CISC106.typ.includes("winter")).toEqual(false);
        expect(CISC106.typ.includes("spring")).toEqual(true);
        expect(CISC106.typ.includes("summer")).toEqual(true);
        expect(CISC106.typ.includes("fall")).toEqual(true);
        const MUSC470 = convertCourse(catalog["MUSC"]["MUSC 470"]);
        expect(MUSC470.typ.includes("winter")).toEqual(false);
        expect(MUSC470.typ.includes("spring")).toEqual(false);
        expect(MUSC470.typ.includes("summer")).toEqual(false);
        expect(MUSC470.typ.includes("fall")).toEqual(true);
    });
});
