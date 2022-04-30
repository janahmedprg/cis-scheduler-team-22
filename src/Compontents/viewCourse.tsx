import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course, convertCourse } from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester } from "../interfaces/Semester";
import { EditCourse } from "./editCourse";
import { catalog } from "./readJSON";

export function ViewCourse({
    course,
    semester,
    degreePlan,
    degreePlans,
    setDegreePlans,
    nextId,
    setNextId,
    coursePool,
    setCoursePool
}: {
    course: Course;
    semester: Semester;
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (id: number) => void;
    coursePool: Course[];
    setCoursePool: (newCoursePool: Course[]) => void;
}) {
    const [editing, setEditing] = useState<boolean>(false);

    function removeCourse() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const courseIndex = semester.courses.findIndex(
            (c: Course): boolean => c.id === course.id
        );
        const newCourseList = [...semester.courses];
        newCourseList.splice(courseIndex, 1);
        const newSemester = { ...semester, courses: newCourseList };

        const newSemesterList: Semester[] = degreePlan.semesters.map(
            (s: Semester): Semester =>
                s.id === newSemester.id ? newSemester : s
        );
        const newPlan = { ...degreePlan, semesters: newSemesterList };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setNextId(nextId + 1);
        setDegreePlans(newPlans);
    }
    function addToPool() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const courseIndex = semester.courses.findIndex(
            (c: Course): boolean => c.id === course.id
        );
        const newCourseList = [...semester.courses];
        const newPoolCourse = semester.courses[courseIndex];
        newCourseList.splice(courseIndex, 1);
        const newSemester = { ...semester, courses: newCourseList };

        const newSemesterList: Semester[] = degreePlan.semesters.map(
            (s: Semester): Semester =>
                s.id === newSemester.id ? newSemester : s
        );
        const newPlan = { ...degreePlan, semesters: newSemesterList };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setNextId(nextId + 1);
        setDegreePlans(newPlans);
        setCoursePool([...coursePool, newPoolCourse]);
    }

    function resetCourse() {
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
        const category: string = foundCourse.code.slice(0, 4).toUpperCase();

        const oldId = foundCourse.id;

        const newCourse: Course = {
            ...convertCourse(catalog[category][foundCourse.code]),
            id: oldId
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

    return (
        <div
            style={{
                display: "inline-block",
                fontSize: "small"
            }}
        >
            <b>{course.code}: </b>
            {course.name} <br />
            <b>Description: </b>
            {course.descr} <br />
            Credits: {course.credits}
            {/* {course.requirementsFulfilled.length > 0 && (
                <div>
                    Fulfills requirements:{" "}
                    <ul>
                        {course.requirementsFulfilled.map(
                            (requirement: string): JSX.Element => (
                                <li key={requirement + "-requirement"}>
                                    {requirement}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )} */}
            {course.prereqs.length > 0 && (
                <div>
                    Prerequisites:{" "}
                    <ul>
                        {course.prereqs.map(
                            (prereq: string): JSX.Element => (
                                <li key={prereq + "-prerequisite"}>{prereq}</li>
                            )
                        )}
                    </ul>
                </div>
            )}
            {!course.typ.includes(semester.session) && (
                <div>
                    {course.typ.length > 0 && (
                        <div style={{ color: "red" }}>
                            WARNING: course not typically offered in{" "}
                            {semester.session}
                        </div>
                    )}
                </div>
            )}
            {editing && (
                <EditCourse
                    course={course}
                    semester={semester}
                    degreePlan={degreePlan}
                    degreePlans={degreePlans}
                    setDegreePlans={setDegreePlans}
                />
            )}
            <p></p>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => removeCourse()}
            >
                Remove course
            </Button>
            <Button onClick={() => setEditing(!editing)}>
                {editing ? "Close" : "Edit"}
            </Button>
            <Button onClick={() => addToPool()}>Add to Pool</Button>
            <Button onClick={() => resetCourse()}>Reset Course</Button>
        </div>
    );
}
