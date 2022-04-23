import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester } from "../interfaces/Semester";
import { EditCourse } from "./editCourse";

export function ViewCourse({
    course,
    semester,
    degreePlan,
    degreePlans,
    setDegreePlans,
    nextId,
    setNextId
}: {
    course: Course;
    semester: Semester;
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (id: number) => void;
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
    return (
        <div>
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
        </div>
    );
}
