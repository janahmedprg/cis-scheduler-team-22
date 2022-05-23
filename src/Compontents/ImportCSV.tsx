import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { convertCourse } from "../interfaces/Course";
import { Degree, EMPTY_DEGREE, OFFICIAL_DEGREES } from "../interfaces/Degree";
import { DegreePlan, EMPTY_PLAN } from "../interfaces/DegreePlan";
import {
    EMPTY_SEMESTER,
    Semester,
    SemesterSession
} from "../interfaces/Semester";
import { catalog } from "./readJSON";

type ImportContentButtonProps = {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    content: string;
    nextId: number;
    setNextId: (newID: number) => void;
};

function ImportContentButton({
    plans,
    setPlans,
    content,
    nextId,
    setNextId
}: ImportContentButtonProps): JSX.Element {
    function CSVToPlan() {
        let tempID = nextId;
        const rows: string[] = content.split("\n");
        let newPlan = { ...EMPTY_PLAN, id: tempID };
        tempID++;
        rows.reduce((previousValue: number, row: string): number => {
            if (previousValue === 0) {
                return previousValue + 1;
            }
            const tokens: string[] = row.split(/","/);
            if (tokens.length < 17) {
                return previousValue + 1;
            }
            if (previousValue === 1) {
                let newDegree = Object.values(OFFICIAL_DEGREES).find(
                    (degree: Degree): boolean =>
                        degree.name === tokens[16].replace(/"/, "")
                );
                if (newDegree === undefined) {
                    newDegree = EMPTY_DEGREE;
                }
                newDegree = { ...newDegree, id: tempID };
                tempID++;
                newPlan = {
                    ...newPlan,
                    name: tokens[15],
                    degree: newDegree
                };
            }
            const foundSemester = newPlan.semesters.find(
                (semester: Semester): boolean =>
                    semester.session === tokens[13] &&
                    semester.year === (parseInt(tokens[14]) || 0)
            );
            let newSemester = foundSemester;
            if (foundSemester === undefined) {
                newSemester = {
                    ...EMPTY_SEMESTER,
                    id: tempID,
                    session: tokens[13] as SemesterSession,
                    year: parseInt(tokens[14]) || 0
                };
                tempID++;
                newPlan = {
                    ...newPlan,
                    semesters: [...newPlan.semesters, newSemester]
                };
            }
            const department = tokens[0].substring(1, 5).replace(/\s/g, "");
            const code = tokens[0].replace(/"/, "");
            let newCourse = convertCourse(catalog[department][code]);
            newCourse = {
                ...newCourse,
                id: tempID,
                name: tokens[1],
                descr: tokens[2],
                credits: parseInt(tokens[3]) || 0,
                restrict: tokens[4],
                requirementsFulfilled: {
                    CAHBreadth: parseInt(tokens[5]) || 0,
                    HCCBreadth: parseInt(tokens[6]) || 0,
                    SBSBreadth: parseInt(tokens[7]) || 0,
                    ForeignLanguage: parseInt(tokens[8]) || 0,
                    LabScience: parseInt(tokens[9]) || 0,
                    CSCore: parseInt(tokens[10]) || 0,
                    TechnicalElective: parseInt(tokens[11]) || 0,
                    CSCapstone: parseInt(tokens[12]) || 0
                }
            };
            tempID++;
            newPlan = {
                ...newPlan,
                semesters: newPlan.semesters.map(
                    (semester: Semester): Semester => {
                        if (
                            semester.session === tokens[13] &&
                            semester.year === (parseInt(tokens[14]) || 0)
                        ) {
                            return {
                                ...semester,
                                courses: [...semester.courses, newCourse]
                            };
                        } else {
                            return semester;
                        }
                    }
                )
            };
            return previousValue + 1;
        }, 0);
        setPlans([...plans, newPlan]);
        setNextId(tempID);
    }
    return (
        <div>
            <Button
                disabled={content === "" || content === "Data cannot be loaded"}
                onClick={() => CSVToPlan()}
                data-testid="upload-button"
            >
                Upload Plan From CSV ⬆
            </Button>
        </div>
    );
}

export function CSVImport({
    plans,
    setPlans,
    nextId,
    setNextId
}: {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (newID: number) => void;
}): JSX.Element {
    const [content, setContent] = useState<string>("");

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Check that the file exists
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const file = event.target.files[0];

            if (file.name.slice(-4) !== ".csv") {
                console.log("Uploaded file is not a .csv");
                setContent("");
            }

            // Create a reader
            const reader = new FileReader();
            // Callback to handle file read-in
            reader.onload = (loadEvent) => {
                const newContent =
                    loadEvent.target?.result || "Data cannot be loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                setContent(newContent as string);
            };

            // Reads in file
            reader.readAsText(file, "utf-8");
        }
    }

    return (
        <div>
            <div>
                <Form.Group controlId="exampleForm">
                    <Form.Label>Upload a file</Form.Label>
                    <div>
                        <Form.Control type="file" onChange={uploadFile} />
                    </div>
                </Form.Group>
            </div>
            <ImportContentButton
                plans={plans}
                setPlans={setPlans}
                content={content}
                nextId={nextId}
                setNextId={setNextId}
            />
        </div>
    );
}
