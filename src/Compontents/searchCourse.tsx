import { catalog } from "../Compontents/readJSON";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function SearchCourses(): JSX.Element {
    const [category, setCategory] = useState<string>("Ex: CISC");
    const [code, setCode] = useState<string>("Ex: CISC 108");
    const [searched, setSearched] = useState<boolean>(false);

    return (
        <div
            style={{
                border: "1px solid black",
                marginLeft: "20px",
                marginRight: "20px"
            }}
        >
            <h2>Course Search (temporarily here)</h2>
            <div>
                <div>
                    {searched === false ? (
                        <div>
                            <Form.Group
                                controlId="formSearchCourseCode"
                                style={{
                                    marginRight: "50px",
                                    display: "inline-block"
                                }}
                            >
                                <Form.Label>Enter course Code:</Form.Label>
                                <Form.Control
                                    value={category}
                                    onChange={(event: ChangeEvent) =>
                                        setCategory(event.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                controlId="formSearchCourseCodeAndName"
                                style={{
                                    marginRight: "50px",
                                    display: "inline-block"
                                }}
                            >
                                <Form.Label>
                                    Enter course Code and Number:
                                </Form.Label>
                                <Form.Control
                                    value={code}
                                    onChange={(event: ChangeEvent) =>
                                        setCode(event.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button
                                style={{ display: "inline-block" }}
                                onClick={() => setSearched(!searched)}
                            >
                                {" "}
                                Search for this course{" "}
                            </Button>
                        </div>
                    ) : (
                        <div> </div>
                    )}
                </div>
                {searched ? <ShowCourse category={category} code={code} /> : ""}
                <div>
                    {searched === true ? (
                        <div>
                            <Button
                                style={{
                                    display: "inline-block"
                                }}
                                onClick={() => setSearched(!searched)}
                            >
                                {" "}
                                Search for another course{" "}
                            </Button>
                        </div>
                    ) : (
                        <div> </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ShowCourse({
    category,
    code
}: {
    category: string;
    code: string;
}): JSX.Element {
    return (
        <div>
            <h5 style={{ textAlign: "left" }}>
                {catalog[category][code].code +
                    ": " +
                    catalog[category][code].name}
            </h5>
            <div>
                <h6 style={{ textAlign: "left" }}> Description: </h6>
                <div style={{ textAlign: "left" }}>
                    {catalog[category][code].descr}{" "}
                </div>
            </div>
            <div style={{ textAlign: "left" }}>
                {"Credits: " + catalog[category][code].credits}
            </div>
            <div style={{ textAlign: "left" }}>
                {"Prerequisites: " + catalog[category][code].preReq}{" "}
            </div>
            <div style={{ textAlign: "left" }}>
                {"Restrictions: " + catalog[category][code].restrict}{" "}
            </div>
            <div style={{ textAlign: "left" }}>
                {"Breadth: " + catalog[category][code].breadth}{" "}
            </div>
        </div>
    );

    //if course not in catalog, display error message (so no crash), otehrwise show course
    //adjust entering code and category
}
