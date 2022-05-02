import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { App } from "../App";

describe("EditQuizView Tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("107-degree-plan");
        currPlan.click();
    });
    test("Check existance of semester name and buttons", () => {
        expect(screen.getAllByText("fall 2022 semester")).toHaveLength(1);
        expect(
            screen.getByTestId("109-edit-clear-semester")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("109-edit-remove-semester")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("109-edit-editing-semester")
        ).toBeInTheDocument();
    });
    test("Test Edit Semester button", () => {
        expect(screen.queryAllByText("Change Semester Session")).toHaveLength(
            0
        );
        expect(screen.queryAllByText("Change Semester Year")).toHaveLength(0);
        expect(screen.queryAllByText("New degree plan Name:")).toHaveLength(0);
        screen.getByTestId("109-edit-editing-semester").click();
        expect(screen.getAllByText("Change Semester Session")).toHaveLength(1);
        expect(screen.getAllByText("Change Semester Year")).toHaveLength(1);
        screen.getByTestId("109-edit-editing-semester").click();
        expect(screen.queryAllByText("Change Semester Session")).toHaveLength(
            0
        );
        expect(screen.queryAllByText("Change Semester Year")).toHaveLength(0);
    });
    test("Test Clear Semester button", () => {
        expect(screen.getAllByText(/MATH 241/)).toHaveLength(1);
        expect(screen.getAllByText(/MATH 242/)).toHaveLength(1);
        expect(screen.getAllByText(/MATH 210/)).toHaveLength(1);
        expect(screen.getAllByText(/MATH 243/)).toHaveLength(1);
        screen.getByTestId("109-edit-clear-semester").click();
        screen.getByTestId("111-edit-clear-semester").click();
        screen.getByTestId("114-edit-clear-semester").click();
        expect(screen.queryAllByText(/MATH 241/)).toHaveLength(0);
        expect(screen.queryAllByText(/MATH 242/)).toHaveLength(0);
        expect(screen.queryAllByText(/MATH 210/)).toHaveLength(0);
        expect(screen.queryAllByText(/MATH 243/)).toHaveLength(0);
    });
    test("Test Remove Semester buttons", () => {
        expect(screen.getAllByText("fall 2022 semester")).toHaveLength(1);
        expect(screen.getAllByText("spring 2023 semester")).toHaveLength(1);
        expect(screen.getAllByText("fall 2023 semester")).toHaveLength(1);
        screen.getByTestId("109-edit-remove-semester").click();
        screen.getByTestId("111-edit-remove-semester").click();
        screen.getByTestId("114-edit-remove-semester").click();
        expect(screen.queryAllByText("fall 2022 semester")).toHaveLength(0);
        expect(screen.queryAllByText("spring 2023 semester")).toHaveLength(0);
        expect(screen.queryAllByText("fall 2023 semester")).toHaveLength(0);
        expect(screen.getAllByText(/This plan has no semesters./)).toHaveLength(
            1
        );
    });
});
