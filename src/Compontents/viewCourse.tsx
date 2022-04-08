import React from "react";
import { Course } from "../interfaces/Course";

export function ViewCourse({ course }: { course: Course }) {
    return (
        <div>
            <b>{course.courseNumber}: </b>
            {course.name}
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
        </div>
    );
}
