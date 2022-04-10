import React from "react";
import { Semester } from "../interfaces/Semester";
import { DegreePlan } from "../interfaces/DegreePlan";

export function ViewDegreePlan({
    degreePlan
}: {
    degreePlan: DegreePlan;
}): JSX.Element {
    return (
        <div>
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
                        {semester}
                    </p>
                )
            )}
        </div>
    );
}
