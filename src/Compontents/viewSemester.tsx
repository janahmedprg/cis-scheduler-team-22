import React from "react";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { ViewCourse } from "./viewCourse";

export function ViewSemester({
    semester,
    degreePlan,
    degreePlans,
    setDegreePlans
}: {
    semester: Semester;
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
}): JSX.Element {
    return (
        <div>
            <h4>
                {semester.session} {semester.year} semester
            </h4>
            {semester.courses.map(
                (course: Course): JSX.Element => (
                    <p
                        key={
                            semester.id.toString() +
                            "-" +
                            course.id.toString() +
                            "-" +
                            "course"
                        }
                    >
                        <ViewCourse course={course} />
                    </p>
                )
            )}
        </div>
    );
}
