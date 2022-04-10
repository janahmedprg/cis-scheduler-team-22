import React from "react";
import { Semester } from "../interfaces/Semester";
import { DegreePlan } from "../interfaces/DegreePlan";
import { ViewSemester } from "./viewSemester";

export function ViewDegreePlan({
    degreePlan
}: {
    degreePlan: DegreePlan;
}): JSX.Element {
    return (
        <div>
            <h3>{degreePlan.name}</h3>
            {degreePlan.semesters.map(
                (semester: Semester): JSX.Element => (
                    <p
                        key={
                            degreePlan.id.toString() +
                            "-" +
                            semester.id.toString() +
                            "-" +
                            "course"
                        }
                    >
                        <ViewSemester semester={semester} />
                    </p>
                )
            )}
        </div>
    );
}
