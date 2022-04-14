import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import { Course } from "../interfaces/Course";
import { Degree } from "../interfaces/Degree";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester } from "../interfaces/Semester";
import { Form } from "react-bootstrap";
import { EditDegreePlan } from "./editDegreePlan";

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
    setDegreePlans
}: {
    degreePlansList: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
}): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [addingDegreePlan, setAddingDegreePlan] = useState<boolean>(false);

    function removeQuizByTitle(degreePlanOption: string) {
        const modifiedDegreePlansList = degreePlansList.filter(
            (degreeplan: DegreePlan): boolean =>
                degreeplan.name !== degreePlanOption
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
                    style={{ marginLeft: "575px", marginRight: "575px" }}
                    type="switch"
                    id="can-edit-quizzes"
                    role="can-edit-quizzes"
                    label={<h5>Click to edit Degree Plans</h5>}
                    checked={editMode}
                    onChange={() => setEditMode(!editMode)}
                />
            </div>
            {degreePlansList.map(
                (degreePlanOption: DegreePlan): JSX.Element => (
                    <p key={degreePlanOption.id.toString()}>
                        <div
                            style={{
                                border: "1px solid black",
                                marginLeft: "20px",
                                marginRight: "20px",
                                marginTop: "20px"
                            }}
                        >
                            {<h3>{degreePlanOption.name}</h3>}
                            {editMode && (
                                <Button
                                    style={{
                                        backgroundColor: "black"
                                    }}
                                    onClick={() =>
                                        removeQuizByTitle(degreePlanOption.name)
                                    }
                                >
                                    Click to delete this Degree Plan
                                </Button>
                            )}
                            {<h3>{degreePlanOption.id}</h3>}
                            {"Length of plan: " +
                                degreePlanOption.semesters.length +
                                " semesters"}
                            {editing && editMode && (
                                <EditDegreePlan
                                    degreePlan={degreePlanOption}
                                    degreePlans={degreePlansList}
                                    setDegreePlans={setDegreePlans}
                                />
                            )}
                            {editMode && (
                                <Button onClick={() => setEditing(!editing)}>
                                    {editing ? "Close" : "Edit"}
                                </Button>
                            )}
                        </div>
                    </p>
                )
            )}
            {editMode && addingDegreePlan && (
                <AddToDegreePlansList
                    degreePlansList={degreePlansList}
                    setDegreePlans={setDegreePlans}
                />
            )}
            {editMode && (
                <Button
                    style={{
                        backgroundColor: "grey"
                    }}
                    onClick={() => setAddingDegreePlan(!addingDegreePlan)}
                >
                    {addingDegreePlan
                        ? "Close adding option"
                        : "Click To Add Degree Plan"}
                </Button>
            )}
        </div>
    );
}

export function AddToDegreePlansList({
    degreePlansList,
    setDegreePlans
}: {
    degreePlansList: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
}): JSX.Element {
    const [id, setId] = useState<number>(0);
    //const [degree, setDegree] = useState<Degree>();
    const [name, setName] = useState<string>("New Degree Plan");
    //const [semesters, setSemesters] = useState<Semester[]>([]);
    //const [questionCount, setquestionCount] = useState<number>(0);

    function appendDegreePlanToList(
        id: number,
        degree: Degree,
        name: string,
        semesters: Semester[]
    ) {
        // Making a new array of movies, with an additional extra one
        const modifiedDegreePlanList = [
            ...degreePlansList,
            {
                id: id,
                degree: degree,
                name: name,
                semesters: semesters
            }
        ];
        // Update the movies array to be the new version
        setDegreePlans(modifiedDegreePlanList);
    }

    return (
        <div>
            <Form.Group
                controlId="formDegreePlanId"
                style={{
                    marginLeft: "200px",
                    marginRight: "200px",
                    marginTop: "20px"
                }}
            >
                <Form.Label>New Degree Plan Id:</Form.Label>
                <Form.Control
                    value={id}
                    onChange={(event: ChangeEvent) =>
                        setId(parseInt(event.target.value))
                    }
                />
            </Form.Group>
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
                    value={name}
                    onChange={(event: ChangeEvent) =>
                        setName(event.target.value)
                    }
                />
            </Form.Group>
            <Form.Group
                controlId="formDegreePlanSemesters"
                style={{
                    marginLeft: "200px",
                    marginRight: "200px",
                    marginTop: "20px"
                }}
            >
                <Form.Label>New Degree Plan Semesters:</Form.Label>
                <Form.Control /**value={semesters} //onChange={(event: ChangeEvent) => setSemesters(event.target.value)} */
                />
            </Form.Group>
            <Button
                style={{
                    backgroundColor: "black"
                }}
                onClick={() =>
                    appendDegreePlanToList(
                        id,
                        {
                            id: 0,
                            name: "",
                            requirements: [],
                            requiredCredits: 0
                        },
                        name,
                        []
                    )
                }
            >
                Add This Degree Plan
            </Button>
        </div>
    );
}
