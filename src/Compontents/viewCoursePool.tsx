import React from "react";
import { Course } from "../interfaces/Course";
import { Button } from "react-bootstrap";

export function ViewC({ course }: { course: Course }): JSX.Element {
    return (
        <div>
            <b>{course.code}: </b>
            {course.name} <br />
            <b>Description: </b>
            {course.descr} <br />
            Credits: {course.credits}
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

export function ViewCoursePool({
    coursePool,
    setCoursePool
}: {
    coursePool: Course[];
    setCoursePool: (newCList: Course[]) => void;
}): JSX.Element {
    function removeCoursePool() {
        setCoursePool([]);
    }
    return (
        <div>
            {coursePool.map(
                (course: Course): JSX.Element => (
                    <ViewC course={course} key={course.id + "-course"}></ViewC>
                )
            )}
            <Button onClick={() => removeCoursePool()}>Clear Pool</Button>
        </div>
    );
}
