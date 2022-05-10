import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import { Course } from "../interfaces/Course";
import { Degree } from "../interfaces/Degree";
import { DegreePlan, getUnfilledRequirements } from "../interfaces/DegreePlan";
import { countCreditsArray, Semester } from "../interfaces/Semester";
import { Form } from "react-bootstrap";
import { EMPTY_REQUIREMENTS } from "../interfaces/Requirements";
import { CSVLink } from "react-csv";
import { createCSVTable } from "../interfaces/CourseCSVTable";

export interface AddDegreePlanToList {
    // Consumes a function that consumes data and returns nothing, passes to a React State Setter).
    appendDegreePlanToList: (
        id: number,
        degree: Degree,
        name: string,
        semesters: Semester[]
    ) => void;
}

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function ViewDegreePlansList({
    degreePlansList,
    setDegreePlans,
    setSelectedPlanId,
    nextId,
    setNextId
}: {
    degreePlansList: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    setSelectedPlanId: (id: number) => void;
    nextId: number;
    setNextId: (id: number) => void;
}): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [addingDegreePlan, setAddingDegreePlan] = useState<boolean>(false);
    //const [viewReq, setViewReq] = useState<boolean>(false);

    function removeQuizByTitle(degreePlanId: number) {
        const modifiedDegreePlansList = degreePlansList.filter(
            (degreeplan: DegreePlan): boolean => degreeplan.id !== degreePlanId
        );
        // Update the movies array to be the new version
        setDegreePlans(modifiedDegreePlansList);
    }
    //add delete button
    //add arrows to move up and down

    return (
        <div>
            <div>
                <Form.Check
                    style={{ marginLeft: "3%", marginRight: "80%" }}
                    type="switch"
                    id="can-edit-degreePlansList"
                    role="can-edit-degreePlansList"
                    label={<h5>Click to edit Degree Plans</h5>}
                    checked={editMode}
                    onChange={() => setEditMode(!editMode)}
                    data-testid="edit-switch-degreePlansList"
                />
            </div>
            <div
                style={{
                    border: "3px solid black",
                    marginLeft: "50px",
                    marginRight: "50px",
                    backgroundColor: "#DCDCDC"
                }}
            >
                {degreePlansList.map(
                    (degreePlanOption: DegreePlan): JSX.Element => (
                        <div key={degreePlanOption.id.toString()}>
                            <div
                                style={{
                                    border: "1px solid black",
                                    marginLeft: "20px",
                                    marginRight: "20px",
                                    marginTop: "20px",
                                    backgroundColor: "white"
                                }}
                            >
                                {
                                    <span
                                        style={{
                                            fontWeight: "550",
                                            fontSize: "200%"
                                        }}
                                    >
                                        {degreePlanOption.name +
                                            " - " +
                                            degreePlanOption.semesters.length +
                                            " semesters, " +
                                            degreePlanOption.semesters.reduce(
                                                (
                                                    currentTotal: number,
                                                    semester: Semester
                                                ): number =>
                                                    currentTotal +
                                                    semester.courses.length,
                                                0
                                            ) +
                                            " courses, " +
                                            countCreditsArray(
                                                degreePlanOption.semesters
                                            ) +
                                            " credits"}
                                    </span>
                                }
                                <div>
                                    <Button
                                        onClick={() =>
                                            setSelectedPlanId(
                                                degreePlanOption.id
                                            )
                                        }
                                        style={{
                                            fontSize: "18px",
                                            fontStyle: "900px",
                                            marginBottom: "10px",
                                            fontFamily: "Arial",
                                            marginRight: "20px"
                                        }}
                                        data-testid={
                                            degreePlanOption.id + "-degree-plan"
                                        }
                                    >
                                        View Plan
                                    </Button>
                                    <CSVLink
                                        data={createCSVTable(degreePlanOption)}
                                        filename={
                                            degreePlanOption.name + ".csv"
                                        }
                                        style={{ marginRight: "20px" }}
                                        data-testid={
                                            degreePlanOption.id + "-csv-link"
                                        }
                                    >
                                        Download Plan as CSV
                                    </CSVLink>
                                    {/** 
                                    <Button
                                        onClick={() => setViewReq(!viewReq)}
                                        style={{
                                            fontSize: "18px",
                                            fontStyle: "900px",
                                            marginBottom: "10px",
                                            fontFamily: "Arial",
                                            marginRight: "20px"
                                        }}
                                    >
                                        {viewReq
                                            ? "Close"
                                            : "Attatch code for this to show/hide Reqs"}
                                    </Button>
                                    */}
                                    {editMode && (
                                        <Button
                                            style={{
                                                marginBottom: "10px",
                                                backgroundColor: "red",
                                                fontSize: "18px",
                                                fontStyle: "900px",
                                                fontFamily: "Arial",
                                                display: "inline-block"
                                            }}
                                            onClick={() =>
                                                removeQuizByTitle(
                                                    degreePlanOption.id
                                                )
                                            }
                                            data-testid={
                                                degreePlanOption.id +
                                                "-delete-plan"
                                            }
                                        >
                                            Delete this Degree Plan
                                        </Button>
                                    )}
                                    {getUnfilledRequirements(degreePlanOption)
                                        .length === 0 && (
                                        <div
                                            style={{
                                                color: "green",
                                                maxWidth: 900,
                                                margin: "0 auto"
                                            }}
                                        >
                                            This degree plan fulfills all degree
                                            requirements.
                                        </div>
                                    )}
                                    {getUnfilledRequirements(degreePlanOption)
                                        .length > 0 && (
                                        <div
                                            style={{
                                                color: "red",
                                                maxWidth: 900,
                                                margin: "0 auto"
                                            }}
                                        >
                                            <ul>
                                                {getUnfilledRequirements(
                                                    degreePlanOption
                                                ).map(
                                                    (
                                                        string: string
                                                    ): JSX.Element => (
                                                        <li
                                                            key={
                                                                string +
                                                                " requirement failed"
                                                            }
                                                        >
                                                            {string}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
                {editMode && addingDegreePlan && (
                    <AddToDegreePlansList
                        degreePlansList={degreePlansList}
                        setDegreePlans={setDegreePlans}
                        nextId={nextId}
                        setNextId={setNextId}
                    />
                )}
                {editMode && (
                    <Button
                        style={{
                            backgroundColor: "grey",
                            marginBottom: "10px"
                        }}
                        onClick={() => setAddingDegreePlan(!addingDegreePlan)}
                        data-testid="add-close-degree-plan"
                    >
                        {addingDegreePlan
                            ? "Close adding option"
                            : "Click To Add Degree Plan"}
                    </Button>
                )}
            </div>
        </div>
    );
}

export function AddToDegreePlansList({
    degreePlansList,
    setDegreePlans,
    nextId,
    setNextId
}: {
    degreePlansList: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (id: number) => void;
}): JSX.Element {
    //const [degree, setDegree] = useState<Degree>();
    const [name, setName] = useState<string>("New Degree Plan");
    //const [semesters, setSemesters] = useState<Semester[]>([]);
    //const [questionCount, setquestionCount] = useState<number>(0);

    function appendDegreePlanToList(
        degree: Degree,
        name: string,
        semesters: Semester[]
    ) {
        // Making a new array of movies, with an additional extra one
        const modifiedDegreePlanList = [
            ...degreePlansList,
            {
                id: nextId,
                degree: { ...degree, id: nextId + 1 },
                name: name,
                semesters: semesters
            }
        ];
        // Update the movies array to be the new version
        setDegreePlans(modifiedDegreePlanList);
        setNextId(nextId + 2);
    }

    return (
        <div>
            <Form.Group
                controlId="formDegreePlanDegree"
                style={{
                    marginLeft: "200px",
                    marginRight: "200px",
                    marginTop: "20px"
                }}
            >
                <Form.Label>New Degree Plan Degree:</Form.Label>
                <Form.Control /**value={degree} //onChange={updateDegreePlanDegree} */
                    data-testid="new-degree-plan-degree"
                />
            </Form.Group>
            <Form.Group
                controlId="formDegreePlanName"
                style={{
                    marginLeft: "200px",
                    marginRight: "200px",
                    marginTop: "20px"
                }}
            >
                <Form.Label>New Degree Plan Name:</Form.Label>
                <Form.Control
                    data-testid="new-degree-plan-name"
                    value={name}
                    onChange={(event: ChangeEvent) =>
                        setName(event.target.value)
                    }
                ></Form.Control>
            </Form.Group>
            <Button
                style={{
                    backgroundColor: "black"
                }}
                onClick={() =>
                    appendDegreePlanToList(
                        {
                            id: 0,
                            name: "",
                            requirements: EMPTY_REQUIREMENTS,
                            requiredCourses: [],
                            requiredCredits: 0
                        },
                        name,
                        []
                    )
                }
                data-testid="add-to-degree-plan"
            >
                Add This Degree Plan
            </Button>
        </div>
    );
}
