import { catalog, courseList } from "../Compontents/readJSON";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
    ImportCourse,
    convertCourse,
    Course,
    EMPTY_COURSE
} from "../interfaces/Course";
import ALL_COURSE_CODES from "../allCourseCodes.json";

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
            <h2>Course Search</h2>
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
                {searched && category === "" && code === "" ? (
                    <div style={{ fontSize: "30px", color: "red" }}>
                        Please enter valid course information
                    </div>
                ) : (
                    <div></div>
                )}
                {searched && category === "" && code !== "" ? (
                    <div style={{ fontSize: "30px", color: "red" }}>
                        Error: No course code entered
                    </div>
                ) : (
                    <div></div>
                )}
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
    /**Here I am creating an array of courses (searchedCourses) of the entered  course category. With this array,
     * I map it to access every course. While mapping every course of the entered course code, I push the course
     * number (last 3 digits of course.code) to an array called numbers, which should contain all the course numbers of the
     * entered course category. Then in the first line of the return statement I first check if the course category
     * entered is viable (this part works and is used in the component below already) and then I try to check if the
     * entered course number is in the array of course numbers that I created based on the catgeory passed in.
     * Somethings going wrong though with my method for checking the course number and I couldnt get it right
     * because 'numbers.includes(code)' keeps returning false when it shouldnt. If you delete that line from the
     * return statement, it works but if the course number entered isnt found the web page crashes
     * -
     * I couldnt directly check the imported record or the catalog of courses but I may have been doing it wrong*/

    const searchedCourses = courseList.filter((course: ImportCourse): boolean =>
        category === "ART"
            ? category + " " === course.code.slice(0, 4)
            : category === course.code.slice(0, 4)
    );

    const numbers: string[] = searchedCourses.map(
        (course: ImportCourse): string => course.code.slice(-3)
    );

    const courseFound: boolean =
        ALL_COURSE_CODES.includes(category) && numbers.includes(code.slice(-3));

    const adjustedCourse: Course = courseFound
        ? convertCourse(catalog[category][code])
        : EMPTY_COURSE; //prevents crashing if invalide code entered

    return (
        <div>
            {courseFound ? (
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
            ) : (
                <div>Course not found</div>
            )}
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
    const searchedCourses = courseList.filter((course: ImportCourse): boolean =>
        category === "ART"
            ? category + " " === course.code.slice(0, 4)
            : category === course.code.slice(0, 4)
    );
    const adjustedCourses = searchedCourses.map(
        (course: ImportCourse): Course => convertCourse(course)
    );
    return (
        <div>
            {ALL_COURSE_CODES.includes(category) ? (
                <div>
                    {adjustedCourses.map(
                        (course: Course): JSX.Element => (
                            <p key={course.code.toString()}>
                                <div
                                    style={{
                                        border: "1px solid black",
                                        paddingBlock: "3px"
                                    }}
                                >
                                    <div style={{ textAlign: "left" }}>
                                        <b
                                            style={{
                                                marginRight: "30px"
                                            }}
                                        >
                                            {course.code + ": " + course.name}
                                        </b>
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
                <div style={{ fontSize: "30px", color: "red" }}>
                    Error: Course code Invalid
                </div>
            )}
        </div>
    );
}
