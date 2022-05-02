import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester } from "../interfaces/Semester";
import { EditCourseRequirements } from "./editCourseRequirements";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function EditCourse({
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
    function updateCourse(
        courseCode: string,
        name: string,
        description: string,
        credits: number
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
        const newCourse: Course = {
            ...foundCourse,
            code: courseCode,
            name: name,
            descr: description,
            credits: credits,
            requirementsFulfilled: {
                CAHBreadth:
                    course.requirementsFulfilled.CAHBreadth > 0 ? credits : 0,
                HCCBreadth:
                    course.requirementsFulfilled.HCCBreadth > 0 ? credits : 0,
                SBSBreadth:
                    course.requirementsFulfilled.SBSBreadth > 0 ? credits : 0,
                ForeignLanguage:
                    course.requirementsFulfilled.ForeignLanguage > 0
                        ? credits
                        : 0,
                LabScience:
                    course.requirementsFulfilled.LabScience > 0 ? credits : 0,
                CSCore: course.requirementsFulfilled.CSCore > 0 ? credits : 0,
                TechnicalElective:
                    course.requirementsFulfilled.TechnicalElective > 0
                        ? credits
                        : 0,
                CSCapstone:
                    course.requirementsFulfilled.CSCapstone > 0 ? credits : 0
            }
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
    function updateCourseName(event: ChangeEvent) {
        updateCourse(
            course.code,
            event.target.value,
            course.descr,
            course.credits
        );
    }
    function updateCourseDescription(event: ChangeEvent) {
        updateCourse(
            course.code,
            course.name,
            event.target.value,
            course.credits
        );
    }
    function updateCourseCredits(event: ChangeEvent) {
        updateCourse(
            course.code,
            course.name,
            course.descr,
            parseInt(event.target.value) || 0
        );
    }

    return (
        <div>
            <h3>Editing {course.code}</h3>
            <Form.Group controlId="formCourseName">
                {" "}
                <Form.Label>Course Name:</Form.Label>
                <Form.Control
                    data-testid={"edit-name" + course.id}
                    value={course.name}
                    onChange={updateCourseName}
                />
            </Form.Group>
            <Form.Group controlId="formCourseDescription">
                <Form.Label>Course Description:</Form.Label>
                <Form.Control
                    data-testid={"edit-descr" + course.id}
                    as={"textarea"}
                    rows={5}
                    value={course.descr}
                    onChange={updateCourseDescription}
                />
            </Form.Group>
            <Form.Group controlId="formCourseCredits">
                <Form.Label>Credits</Form.Label>
                <Form.Control
                    data-testid={"edit-credits" + course.id}
                    value={course.credits}
                    onChange={updateCourseCredits}
                    type={"number"}
                />
            </Form.Group>
            <EditCourseRequirements
                course={course}
                semester={semester}
                degreePlan={degreePlan}
                degreePlans={degreePlans}
                setDegreePlans={setDegreePlans}
            />
        </div>
    );
}
