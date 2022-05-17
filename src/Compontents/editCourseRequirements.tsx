import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Requirements } from "../interfaces/Requirements";
import { Semester } from "../interfaces/Semester";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function EditCourseRequirements({
    degreePlans,
    degreePlan,
    semester,
    course,
    setDegreePlans
}: {
    degreePlans: DegreePlan[];
    degreePlan: DegreePlan;
    semester: Semester;
    course: Course;
    setDegreePlans: (plans: DegreePlan[]) => void;
}) {
    function updateCourseRequirements(
        CAHBreadth: number,
        HCCBreadth: number,
        SBSBreadth: number,
        ForeignLanguage: number,
        LabScience: number,
        CSCore: number,
        TechnicalElective: number,
        CSCapstone: number
    ) {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const foundSemester = foundDegreePlan.semesters.find(
            (semester1: Semester): boolean => semester1.id === semester.id
        );
        if (foundSemester === undefined) {
            return;
        }
        const foundCourse = foundSemester.courses.find(
            (course1: Course): boolean => course1.id === course.id
        );
        if (foundCourse === undefined) {
            return;
        }
        const newRequirements: Requirements = {
            CAHBreadth: CAHBreadth,
            HCCBreadth: HCCBreadth,
            SBSBreadth: SBSBreadth,
            ForeignLanguage: ForeignLanguage,
            LabScience: LabScience,
            CSCore: CSCore,
            TechnicalElective: TechnicalElective,
            CSCapstone: CSCapstone
        };
        const newCourse: Course = {
            ...foundCourse,
            requirementsFulfilled: newRequirements
        };
        const newSemester: Semester = {
            ...foundSemester,
            courses: foundSemester.courses.map(
                (course: Course): Course =>
                    course.id === newCourse.id ? newCourse : course
            )
        };
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: foundDegreePlan.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === newSemester.id ? newSemester : semester
            )
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    function updateCAHBreadth(event: ChangeEvent) {
        updateCourseRequirements(
            event.target.checked ? course.credits : 0,
            course.requirementsFulfilled.HCCBreadth,
            course.requirementsFulfilled.SBSBreadth,
            course.requirementsFulfilled.ForeignLanguage,
            course.requirementsFulfilled.LabScience,
            course.requirementsFulfilled.CSCore,
            course.requirementsFulfilled.TechnicalElective,
            course.requirementsFulfilled.CSCapstone
        );
    }
    function updateHCCBreadth(event: ChangeEvent) {
        updateCourseRequirements(
            course.requirementsFulfilled.CAHBreadth,
            event.target.checked ? course.credits : 0,
            course.requirementsFulfilled.SBSBreadth,
            course.requirementsFulfilled.ForeignLanguage,
            course.requirementsFulfilled.LabScience,
            course.requirementsFulfilled.CSCore,
            course.requirementsFulfilled.TechnicalElective,
            course.requirementsFulfilled.CSCapstone
        );
    }
    function updateSBSBreadth(event: ChangeEvent) {
        updateCourseRequirements(
            course.requirementsFulfilled.CAHBreadth,
            course.requirementsFulfilled.HCCBreadth,
            event.target.checked ? course.credits : 0,
            course.requirementsFulfilled.ForeignLanguage,
            course.requirementsFulfilled.LabScience,
            course.requirementsFulfilled.CSCore,
            course.requirementsFulfilled.TechnicalElective,
            course.requirementsFulfilled.CSCapstone
        );
    }
    function updateForeignLanguage(event: ChangeEvent) {
        updateCourseRequirements(
            course.requirementsFulfilled.CAHBreadth,
            course.requirementsFulfilled.HCCBreadth,
            course.requirementsFulfilled.SBSBreadth,
            event.target.checked ? course.credits : 0,
            course.requirementsFulfilled.LabScience,
            course.requirementsFulfilled.CSCore,
            course.requirementsFulfilled.TechnicalElective,
            course.requirementsFulfilled.CSCapstone
        );
    }
    function updateLabScience(event: ChangeEvent) {
        updateCourseRequirements(
            course.requirementsFulfilled.CAHBreadth,
            course.requirementsFulfilled.HCCBreadth,
            course.requirementsFulfilled.SBSBreadth,
            course.requirementsFulfilled.ForeignLanguage,
            event.target.checked ? course.credits : 0,
            course.requirementsFulfilled.CSCore,
            course.requirementsFulfilled.TechnicalElective,
            course.requirementsFulfilled.CSCapstone
        );
    }
    function updateCSCore(event: ChangeEvent) {
        updateCourseRequirements(
            course.requirementsFulfilled.CAHBreadth,
            course.requirementsFulfilled.HCCBreadth,
            course.requirementsFulfilled.SBSBreadth,
            course.requirementsFulfilled.ForeignLanguage,
            course.requirementsFulfilled.LabScience,
            event.target.checked ? course.credits : 0,
            course.requirementsFulfilled.TechnicalElective,
            course.requirementsFulfilled.CSCapstone
        );
    }
    function updateTechnicalElective(event: ChangeEvent) {
        updateCourseRequirements(
            course.requirementsFulfilled.CAHBreadth,
            course.requirementsFulfilled.HCCBreadth,
            course.requirementsFulfilled.SBSBreadth,
            course.requirementsFulfilled.ForeignLanguage,
            course.requirementsFulfilled.LabScience,
            course.requirementsFulfilled.CSCore,
            event.target.checked ? course.credits : 0,
            course.requirementsFulfilled.CSCapstone
        );
    }
    function updateCSCapstone(event: ChangeEvent) {
        updateCourseRequirements(
            course.requirementsFulfilled.CAHBreadth,
            course.requirementsFulfilled.HCCBreadth,
            course.requirementsFulfilled.SBSBreadth,
            course.requirementsFulfilled.ForeignLanguage,
            course.requirementsFulfilled.LabScience,
            course.requirementsFulfilled.CSCore,
            course.requirementsFulfilled.TechnicalElective,
            event.target.checked ? course.credits : 0
        );
    }
    return (
        <div>
            Requirements: <br />
            <Form.Check
                data-testid={"cah-check" + course.id}
                style={{ marginLeft: "20px", marginRight: "20px" }}
                type="checkbox"
                id={"cah-check" + course.id}
                label="Creative Arts and Humanities Breadth"
                checked={course.requirementsFulfilled.CAHBreadth > 0}
                onChange={updateCAHBreadth}
            />
            <Form.Check
                data-testid={"hcc-check" + course.id}
                style={{ marginLeft: "20px", marginRight: "20px" }}
                type="checkbox"
                id={"hcc-check" + course.id}
                label="History and Cultural Change Breadth"
                checked={course.requirementsFulfilled.HCCBreadth > 0}
                onChange={updateHCCBreadth}
            />
            <Form.Check
                data-testid={"sbs-check" + course.id}
                style={{ marginLeft: "20px", marginRight: "20px" }}
                type="checkbox"
                id={"sbs-check" + course.id}
                label="Social and Behavioral Sciences Breadth"
                checked={course.requirementsFulfilled.SBSBreadth > 0}
                onChange={updateSBSBreadth}
            />
            <Form.Check
                data-testid={"lang-check" + course.id}
                style={{ marginLeft: "20px", marginRight: "20px" }}
                type="checkbox"
                id={"lang-check" + course.id}
                label="Foriegn Language"
                checked={course.requirementsFulfilled.ForeignLanguage > 0}
                onChange={updateForeignLanguage}
            />
            <Form.Check
                data-testid={"lab-check" + course.id}
                style={{ marginLeft: "20px", marginRight: "20px" }}
                type="checkbox"
                id={"lab-check" + course.id}
                label="Lab Science"
                checked={course.requirementsFulfilled.LabScience > 0}
                onChange={updateLabScience}
            />
            <Form.Check
                data-testid={"core-check" + course.id}
                style={{ marginLeft: "20px", marginRight: "20px" }}
                type="checkbox"
                id={"core-check" + course.id}
                label="Computer Science Core"
                checked={course.requirementsFulfilled.CSCore > 0}
                onChange={updateCSCore}
            />
            <Form.Check
                data-testid={"elec-check" + course.id}
                style={{ marginLeft: "20px", marginRight: "20px" }}
                type="checkbox"
                id={"elec-check" + course.id}
                label="Technical Elective"
                checked={course.requirementsFulfilled.TechnicalElective > 0}
                onChange={updateTechnicalElective}
            />
            <Form.Check
                data-testid={"cap-check" + course.id}
                style={{ marginLeft: "20px", marginRight: "20px" }}
                type="checkbox"
                id={"cap-check" + course.id}
                label="Computer Science Capstone"
                checked={course.requirementsFulfilled.CSCapstone > 0}
                onChange={updateCSCapstone}
            />
        </div>
    );
}
