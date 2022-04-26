import { catalog, courseList } from "../Compontents/readJSON";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ImportCourse, convertCourse, Course } from "../interfaces/Course";
//import { Requirements } from "../interfaces/Requirements";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function SearchCourses(): JSX.Element {
    const [category, setCategory] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [searched, setSearched] = useState<boolean>(false);

    return (
        <div
            style={{
                border: "3px solid black",
                marginLeft: "20px",
                marginRight: "20px"
            }}
        >
            <h2>Course Search (temporarily here)</h2>
            <h5 style={{ backgroundColor: "pink" }}>
                REMINDER: Write code for if course code not in record or course
                number not in list or both
            </h5>
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
                {searched && category !== "" && code !== "" ? (
                    <ShowCourse
                        category={category.toUpperCase()}
                        code={category.toUpperCase() + " " + code}
                    />
                ) : (
                    <div></div>
                )}
                {searched && category !== "" && code === "" ? (
                    <ShowAllCourses category={category.toUpperCase()} />
                ) : (
                    <div></div>
                )}
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
    const adjustedCourse: Course = convertCourse(catalog[category][code]);

    /** 
    const searchedCourses = courseList.map(
        (course: ImportCourse): boolean => course.code === category + " " + code
    );
    function checkForCode(category: string, code: string): boolean {
        const found = courseList.find(
            (course: ImportCourse): boolean => {
                if(course.code.slice(0, 4) === category &&
                course.code.slice(5, 7) === code ){
                    return true;
                }
        );
    }
    */

    return (
        <div>
            {
                // ? (
                <div>
                    <h5 style={{ textAlign: "left" }}>
                        {adjustedCourse.code + ": " + adjustedCourse.name}
                    </h5>
                    <span>
                        <span style={{ textAlign: "left", fontWeight: "700" }}>
                            {" "}
                            Description:{" "}
                        </span>
                        <span style={{ textAlign: "left" }}>
                            {adjustedCourse.descr !== ""
                                ? adjustedCourse.descr
                                : "No description offered"}{" "}
                        </span>
                    </span>
                    <div style={{ textAlign: "left" }}>
                        {"Credits: " + adjustedCourse.credits}
                    </div>
                    <div style={{ textAlign: "left" }}>
                        {"Prerequisites: " + adjustedCourse.prereqs}{" "}
                    </div>
                    <div style={{ textAlign: "left" }}>
                        {"Restrictions: " + adjustedCourse.restrict}{" "}
                    </div>
                    <div style={{ textAlign: "left" }}>
                        {"Requirements Fulfilled: " +
                            adjustedCourse.requirementsFulfilled}
                    </div>
                    <div style={{ textAlign: "left" }}>
                        {"Typically offered: " + adjustedCourse.typ}
                    </div>
                </div>
                //) : (
                //    <div>Course not found</div>
                //)
            }
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
    const searchedCourses = courseList.filter(
        (course: ImportCourse): boolean => category === course.code.slice(0, 4)
    );
    const adjustedCourses = searchedCourses.map(
        (course: ImportCourse): Course => convertCourse(course)
    );
    return (
        <div>
            {searchedCourses !== [] ? (
                <div>
                    {adjustedCourses.map(
                        (course: Course): JSX.Element => (
                            <p key={course.code.toString()}>
                                <div>
                                    <div style={{ textAlign: "left" }}>
                                        <text
                                            style={{
                                                marginRight: "30px"
                                            }}
                                        >
                                            {course.code + ": " + course.name}
                                        </text>
                                        <text
                                            style={{
                                                display: "inline-block",
                                                fontSize: "small",
                                                marginRight: "30px"
                                            }}
                                        >
                                            {"Credits: " + course.credits}
                                        </text>
                                        <text
                                            style={{
                                                display: "inline-block",
                                                fontSize: "small",
                                                marginRight: "30px"
                                            }}
                                        >
                                            {"Typically offered: " + course.typ}
                                        </text>
                                    </div>
                                    <text style={{ fontSize: "small" }}>
                                        <div style={{ textAlign: "left" }}>
                                            {course.descr !== ""
                                                ? "Description: " + course.descr
                                                : "No description offered"}{" "}
                                        </div>
                                    </text>
                                </div>
                            </p>
                        )
                    )}
                </div>
            ) : (
                <div>Course code not Found</div>
            )}
        </div>
    );
}
