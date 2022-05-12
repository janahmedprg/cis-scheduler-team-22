import { catalog, courseList } from "../Compontents/readJSON";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
    ImportCourse,
    convertCourse,
    Course,
    EMPTY_COURSE
} from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester } from "../interfaces/Semester";
import ALL_COURSE_CODES from "../allCourseCodes.json";
import { toString } from "../interfaces/Requirements";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function SearchCoursesSemesterView({
    degreePlan,
    degreePlans,
    setDegreePlans,
    nextId,
    setNextId
}: {
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (id: number) => void;
}): JSX.Element {
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
            <h2>Course Adder</h2>
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
                                    data-testid={
                                        degreePlan.id + "-add-course-code"
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
                                    data-testid={
                                        degreePlan.id + "-add-course-number"
                                    }
                                />
                            </Form.Group>
                            <Button
                                style={{
                                    display: "inline-block",
                                    marginBottom: "10px"
                                }}
                                onClick={() => setSearched(!searched)}
                                data-testid={
                                    degreePlan.id + "-add-course-search"
                                }
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
                                data-testid={
                                    degreePlan.id + "-add-course-search-close"
                                }
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
                    <ListSingleCourse
                        category={category.toUpperCase()}
                        code={category.toUpperCase() + " " + code}
                        degreePlan={degreePlan}
                        degreePlans={degreePlans}
                        setDegreePlans={setDegreePlans}
                        nextId={nextId}
                        setNextId={setNextId}
                    />
                ) : (
                    <div></div>
                )}
                {searched && category !== "" && code === "" ? (
                    <ListAllCourses
                        category={category.toUpperCase()}
                        degreePlan={degreePlan}
                        degreePlans={degreePlans}
                        setDegreePlans={setDegreePlans}
                        nextId={nextId}
                        setNextId={setNextId}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export function ListAllCourses({
    category,
    degreePlan,
    degreePlans,
    setDegreePlans,
    nextId,
    setNextId
}: {
    category: string;
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (id: number) => void;
}): JSX.Element {
    const [choice, setChoice] = useState<string>(
        degreePlan.semesters[0].id.toString()
    );

    function addCourse(id: string, addingCourse: Course) {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }

        const foundSemester = degreePlan.semesters.find(
            (semester: Semester): boolean => semester.id === parseInt(id)
        );
        if (foundSemester === undefined) {
            return;
        }

        const newCourse = { ...addingCourse, id: nextId };

        const newSemester: Semester = {
            ...foundSemester,
            courses: [...foundSemester.courses, newCourse]
        };
        const newSemesterList: Semester[] = degreePlan.semesters.map(
            (s: Semester): Semester =>
                s.id === newSemester.id ? newSemester : s
        );
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: [...newSemesterList]
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setNextId(nextId + 1);
        setDegreePlans(newPlans);
    }

    const searchedCourses = courseList.filter((course: ImportCourse): boolean =>
        category === "ART"
            ? category + " " === course.code.slice(0, 4)
            : category === course.code.slice(0, 4)
    );
    const adjustedCourses = searchedCourses.map(
        (course: ImportCourse): Course => convertCourse(course)
    );

    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setChoice(event.target.value);
    }

    const allIncludedCourses: string[] = [];
    degreePlan.semesters.map((semester: Semester) =>
        semester.courses.map((course: Course) =>
            allIncludedCourses.push(course.code)
        )
    );
    return (
        <div>
            <Form.Group controlId="currentChoice">
                <Form.Label>Select the semester to add to</Form.Label>
                <Form.Select value={choice} onChange={updateChoice}>
                    {degreePlan.semesters.map((semester: Semester) => (
                        <option
                            key={
                                degreePlan.id.toString() +
                                "-" +
                                semester.id.toString()
                            }
                            value={semester.id}
                        >
                            {semester.session + semester.year + " semester"}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {ALL_COURSE_CODES.includes(category) ? (
                <div>
                    {adjustedCourses.map(
                        (course: Course): JSX.Element => (
                            <div key={course.code.toString()}>
                                <div
                                    style={{ borderBottom: ".5px solid gray" }}
                                >
                                    <div
                                        style={{
                                            textAlign: "left",
                                            marginTop: "5px"
                                        }}
                                    >
                                        <Button
                                            style={{
                                                marginRight: "10px",
                                                padding: "2px 2px"
                                            }}
                                            onClick={() =>
                                                addCourse(choice, course)
                                            }
                                        >
                                            Add {course.code}
                                        </Button>
                                        <span
                                            style={{
                                                marginRight: "30px",
                                                fontWeight: "1px"
                                            }}
                                        >
                                            {course.code + ": " + course.name}
                                        </span>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                fontSize: "small",
                                                marginRight: "30px"
                                            }}
                                        >
                                            {"Credits: " + course.credits}
                                        </span>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                fontSize: "small",
                                                marginRight: "30px"
                                            }}
                                        >
                                            {"Typically offered: " + course.typ}
                                        </span>
                                        <span
                                            style={{
                                                color: "red",
                                                textAlign: "right"
                                            }}
                                        >
                                            {allIncludedCourses.includes(
                                                course.code
                                            )
                                                ? "WARNING: " +
                                                  course.code +
                                                  " currently exists within this degree plan"
                                                : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
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

export function ListSingleCourse({
    category,
    code,
    degreePlan,
    degreePlans,
    setDegreePlans,
    nextId,
    setNextId
}: {
    category: string;
    code: string;
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (id: number) => void;
}): JSX.Element {
    const [choice, setChoice] = useState<string>(
        degreePlan.semesters[0].id.toString()
    );

    function addCourse(id: string, addingCourse: Course) {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }

        const foundSemester = degreePlan.semesters.find(
            (semester: Semester): boolean => semester.id === parseInt(id)
        );
        if (foundSemester === undefined) {
            return;
        }

        const newCourse = { ...addingCourse, id: nextId };

        const newSemester: Semester = {
            ...foundSemester,
            courses: [...foundSemester.courses, newCourse]
        };
        const newSemesterList: Semester[] = degreePlan.semesters.map(
            (s: Semester): Semester =>
                s.id === newSemester.id ? newSemester : s
        );
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: [...newSemesterList]
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setNextId(nextId + 1);
        setDegreePlans(newPlans);
    }

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

    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setChoice(event.target.value);
    }

    const allIncludedCourses: string[] = [];
    degreePlan.semesters.map((semester: Semester) =>
        semester.courses.map((course: Course) =>
            allIncludedCourses.push(course.code)
        )
    );
    return (
        <div>
            {courseFound ? (
                <div>
                    <Form.Group controlId="currentChoice">
                        <Form.Label>Select the semester to add to</Form.Label>
                        <Form.Select value={choice} onChange={updateChoice}>
                            {degreePlan.semesters.map((semester: Semester) => (
                                <option
                                    key={
                                        degreePlan.id.toString() +
                                        "-" +
                                        semester.id.toString()
                                    }
                                    value={semester.id}
                                >
                                    {semester.session +
                                        " " +
                                        semester.year +
                                        " semester"}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button
                        style={{
                            marginRight: "10px",
                            padding: "2px 2px"
                        }}
                        onClick={() => addCourse(choice, adjustedCourse)}
                    >
                        Add {adjustedCourse.code}
                    </Button>
                    <div
                        style={{
                            color: "red",
                            textAlign: "center"
                        }}
                    >
                        {allIncludedCourses.includes(adjustedCourse.code)
                            ? "WARNING: " +
                              adjustedCourse.code +
                              " currently exists within this degree plan"
                            : ""}
                    </div>
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
                            toString(adjustedCourse.requirementsFulfilled)}
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
}
