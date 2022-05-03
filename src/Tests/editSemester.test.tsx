import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("ViewCourse tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("107-degree-plan");
        currPlan.click();
    });
    test("Edit semester button exists", () => {
        expect(
            screen.getByTestId("109-edit-editing-semester")
        ).toBeInTheDocument();
    });
    test("Test Edit semester button", () => {
        expect(screen.queryAllByText("Change Semester Session")).toHaveLength(
            0
        );
        expect(screen.queryAllByText("Change Semester Year")).toHaveLength(0);
        screen.getByTestId("109-edit-editing-semester").click();
        expect(screen.queryAllByText("Change Semester Session")).toHaveLength(
            1
        );
        expect(screen.queryAllByText("Change Semester Year")).toHaveLength(1);
        screen.getByTestId("109-edit-editing-semester").click();
        expect(screen.queryAllByText("Change Semester Session")).toHaveLength(
            0
        );
        expect(screen.queryAllByText("Change Semester Year")).toHaveLength(0);
    });
    test("Editing fields changes the values", () => {
        screen.getByTestId("109-edit-editing-semester").click();
        expect(screen.queryAllByText("Change Semester Session")).toHaveLength(
            1
        );
        expect(screen.queryAllByText("Change Semester Year")).toHaveLength(1);
        expect(screen.getByTestId("109-semester")).toBeInTheDocument();
        expect(screen.getByTestId("109-session")).toBeInTheDocument();
        expect(screen.queryAllByText("fall 2022 semester")).toHaveLength(1);
        const semesterYear = screen.getByTestId("109-semester");
        userEvent.type(semesterYear, "{selectall}{delete}new year");
        const semesterSession = screen.getByTestId("109-session");
        userEvent.type(semesterSession, "{selectall}{delete}new session");
        screen.getByTestId("109-edit-editing-semester").click();
        expect(screen.queryAllByText("fall 2022 semester")).toHaveLength(0);
        expect(screen.queryAllByText(/fall 2022 semester/i)).toHaveLength(0);
    });
});
