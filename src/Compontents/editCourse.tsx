import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester } from "../interfaces/Semester";

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
            credits: credits
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
    function updateCourseCode(event: ChangeEvent) {
        updateCourse(
            event.target.value,
            course.name,
            course.descr,
            course.credits
        );
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
            <Form.Group controlId="formCourseNumber">
                <Form.Label>Course Number:</Form.Label>
                <Form.Control value={course.code} onChange={updateCourseCode} />
            </Form.Group>
            <Form.Group controlId="formCourseName">
                <Form.Label>Course Name:</Form.Label>
                <Form.Control value={course.name} onChange={updateCourseName} />
            </Form.Group>
            <Form.Group controlId="formCourseDescription">
                <Form.Label>Course Name:</Form.Label>
                <Form.Control
                    as={"textarea"}
                    rows={5}
                    value={course.descr}
                    onChange={updateCourseDescription}
                />
            </Form.Group>
            <Form.Group controlId="formCourseCredits">
                <Form.Label>Credits</Form.Label>
                <Form.Control
                    value={course.credits}
                    onChange={updateCourseCredits}
                    type={"number"}
                />
            </Form.Group>
        </div>
    );
}
