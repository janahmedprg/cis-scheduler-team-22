import { catalog } from "../Compontents/readJSON";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
//import { Course, ImportCourse } from "../interfaces/Course";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function SearchCourses(): JSX.Element {
    const [category, setCategory] = useState<string>("");
    const [code, setCode] = useState<string>("");
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
                                <Form.Label>
                                    Enter course Code: (Ex: CISC)
                                </Form.Label>
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
                                    Enter course Number: (Ex: 108)
                                </Form.Label>
                                <Form.Control
                                    value={code}
                                    onChange={(event: ChangeEvent) =>
                                        setCode(event.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button
                                style={{
                                    display: "inline-block",
                                    marginBottom: "10px"
                                }}
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
                {searched && category !== "" && code !== "" ? (
                    <ShowCourse
                        category={category.toUpperCase()}
                        code={category.toUpperCase() + " " + code}
                    />
                ) : (
                    <div></div>
                )}
                {searched && category !== "" && code === "" ? (
                    <ShowAllCourses category={category} />
                ) : (
                    <div></div>
                )}
                <div>
                    {searched === true ? (
                        <div>
                            <Button
                                style={{
                                    display: "inline-block",
                                    marginBottom: "10px"
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
            {/**catalog[category].includes(code) ?? code below : nothing */}
            <h5 style={{ textAlign: "left" }}>
                {catalog[category][code].code +
                    ": " +
                    catalog[category][code].name}
            </h5>
            <span>
                <span style={{ textAlign: "left", fontWeight: "700" }}>
                    {" "}
                    Description:{" "}
                </span>
                <span style={{ textAlign: "left" }}>
                    {catalog[category][code].descr}{" "}
                </span>
            </span>
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

    //if course not in catalog (make json of category types), display error message (so no crash),
    //otehrwise show course
    //adjust entering code and category
}

export function ShowAllCourses({
    category
}: {
    category: string;
}): JSX.Element {
    return <div>Write to map all of type {category}</div>;
}
