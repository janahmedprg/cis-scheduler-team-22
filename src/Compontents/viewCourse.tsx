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
    setDegreePlans
}: {
    course: Course;
    semester: Semester;
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
}) {
    const [editing, setEditing] = useState<boolean>(false);
    return (
        <div>
            <b>{course.code}: </b>
            {course.name} <br />
            Credits: {course.credits}
            {course.requirementsFulfilled.length > 0 && (
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
            )}
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
            <Button onClick={() => setEditing(!editing)}>
                {editing ? "Close" : "Edit"}
            </Button>
        </div>
    );
}
