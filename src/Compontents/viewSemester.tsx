import React, { useState } from "react";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { ViewCourse } from "./viewCourse";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Button } from "react-bootstrap";
import { EditSemester } from "./editSemester";

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
    const [editing, setEditing] = useState<boolean>(false);
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
                        <ViewCourse
                            course={course}
                            semester={semester}
                            degreePlan={degreePlan}
                            degreePlans={degreePlans}
                            setDegreePlans={setDegreePlans}
                        />
                    </p>
                )
            )}
            {editing && (
                <EditSemester
                    degreePlans={degreePlans}
                    degreePlan={degreePlan}
                    semester={semester}
                    setDegreePlans={setDegreePlans}
                />
            )}
            <Button onClick={() => setEditing(!editing)}>
                {editing ? "Close" : "Edit Semester"}
            </Button>
        </div>
    );
}
