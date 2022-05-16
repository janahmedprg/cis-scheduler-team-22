import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course, convertCourse, prereqData } from "../interfaces/Course";
import { DegreePlan, getUnfilledRequirements } from "../interfaces/DegreePlan";
import { EMPTY_REQUIREMENTS } from "../interfaces/Requirements";
import { Semester, sessionTime } from "../interfaces/Semester";
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
    const [viewing, setViewing] = useState<boolean>(false);

    function updateViewing(event: React.ChangeEvent<HTMLInputElement>) {
        setViewing(event.target.checked);
    }

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
            <div style={{ marginBottom: "5px", marginTop: "3px" }}>
                <Form.Check
                    style={{
                        display: "inline",
                        marginRight: "10px"
                    }}
                    data-testid={"is-viewing-check" + course.id}
                    type="switch"
                    id={"is-viewing-check" + course.id}
                    checked={viewing}
                    onChange={updateViewing}
                />
                <div style={{ display: "inline" }}>
                    View or Edit Course Information
                </div>
            </div>
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
            {getUnfilledRequirements({
                ...degreePlan,
                degree: {
                    id: 0,
                    name: "",
                    requirements: EMPTY_REQUIREMENTS,
                    requiredCourses: Object.keys(prereqData).includes(
                        course.code
                    )
                        ? prereqData[course.code]
                        : [],
                    requiredCredits: 0
                },
                semesters: degreePlan.semesters.filter(
                    (planSemester: Semester): boolean =>
                        planSemester.year < semester.year ||
                        (planSemester.year === semester.year &&
                            sessionTime[planSemester.session] <
                                sessionTime[semester.session])
                )
            }).length > 0 && (
                <div style={{ color: "red" }}>
                    WARNING: course prerequisites not met
                </div>
            )}
            {viewing && (
                <div>
                    <b>Description: </b>
                    {course.descr} <br />
                    Credits: {course.credits}
                    {course.prereqs.length > 0 && (
                        <div>
                            Prerequisites:
                            <ul>
                                {course.prereqs.map(
                                    (prereq: string[]): JSX.Element => (
                                        <li
                                            key={
                                                prereq.join(" or ") +
                                                "-prerequisite"
                                            }
                                        >
                                            {prereq.join(" or ")}
                                        </li>
                                    )
                                )}
                            </ul>
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
                    <Button
                        style={{ backgroundColor: "red" }}
                        onClick={() => removeCourse()}
                    >
                        Remove course
                    </Button>
                    <Button
                        data-testid={"edit-course-button" + course.id}
                        onClick={() => setEditing(!editing)}
                    >
                        {editing ? "Close" : "Edit"}
                    </Button>
                    <Button
                        onClick={() => addToPool()}
                        data-testid={course.id + "-move-to-pool"}
                    >
                        Move to Pool
                    </Button>
                    <Button
                        onClick={() => resetCourse()}
                        data-testid={"reset-course" + course.id}
                    >
                        Reset Course
                    </Button>
                </div>
            )}
        </div>
    );
}
