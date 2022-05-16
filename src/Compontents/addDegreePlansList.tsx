import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Degree, EMPTY_DEGREE, OFFICIAL_DEGREES } from "../interfaces/Degree";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester } from "../interfaces/Semester";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

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
    const [degree, setDegree] = useState<Degree>(EMPTY_DEGREE);
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

    function updateDegreePlanDegree(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const newDegree = Object.values(OFFICIAL_DEGREES).find(
            (degree: Degree): boolean => degree.name === event.target.value
        );
        if (newDegree !== undefined) {
            setDegree(newDegree);
        }
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
                <Form.Select
                    value={degree.name}
                    onChange={updateDegreePlanDegree}
                    data-testid="new-degree-plan-degree"
                >
                    {Object.values(OFFICIAL_DEGREES).map(
                        (option: Degree): JSX.Element => (
                            <option value={option.name} key={option.name}>
                                {option.name}
                            </option>
                        )
                    )}
                </Form.Select>
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
                onClick={() => appendDegreePlanToList(degree, name, [])}
                data-testid="add-to-degree-plan"
            >
                Add This Degree Plan
            </Button>
        </div>
    );
}
