import React from "react";
import { Semester } from "../interfaces/Semester";
import { DegreePlan } from "../interfaces/DegreePlan";
import { ViewSemester } from "./viewSemester";

export function ViewDegreePlan({
    degreePlan,
    degreePlans,
    setDegreePlans
}: {
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
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
                        <ViewSemester
                            semester={semester}
                            degreePlan={degreePlan}
                            degreePlans={degreePlans}
                            setDegreePlans={setDegreePlans}
                        />
                    </p>
                )
            )}
        </div>
    );
}
