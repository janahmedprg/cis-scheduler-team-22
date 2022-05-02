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
    test("edit button exists", () => {
        const courseSwitch = screen.getByTestId("is-viewing-check110");
        courseSwitch.click();
        expect(screen.getByTestId("edit-course-button110")).toBeInTheDocument();
    });
    test("clicking edit button brings up edit menu", () => {
        const courseSwitch = screen.getByTestId("is-viewing-check110");
        courseSwitch.click();
        expect(screen.queryAllByText(/Editing MATH 241/i)).toHaveLength(0);
        const editButton = screen.getByTestId("edit-course-button110");
        editButton.click();
        expect(screen.queryAllByText(/Editing MATH 241/i)).toHaveLength(1);
        editButton.click();
        expect(screen.queryAllByText(/Editing MATH 241/i)).toHaveLength(0);
    });
    test("editing the fields changes the fields", () => {
        const courseSwitch = screen.getByTestId("is-viewing-check110");
        courseSwitch.click();
        const editButton = screen.getByTestId("edit-course-button110");
        editButton.click();
        const namebox = screen.getByTestId("edit-name110");
        userEvent.type(namebox, "{selectall}{delete}new name");
        const descrbox = screen.getByTestId("edit-descr110");
        userEvent.type(descrbox, "{selectall}{delete}new descr");
        const creditsbox = screen.getByTestId("edit-credits110");
        userEvent.type(creditsbox, "{selectall}{delete}7");
        editButton.click();
        expect(
            screen.queryAllByText(/Analytic Geometry and Calculus A/i)
        ).toHaveLength(0);
        expect(
            screen.queryAllByText(
                /Functions, limits, continuity, derivatives./i
            )
        ).toHaveLength(0);
        expect(screen.queryAllByText(/credits: 4/i)).toHaveLength(0);
        expect(screen.queryAllByText(/new name/i)).toHaveLength(1);
        expect(screen.queryAllByText(/new descr/i)).toHaveLength(1);
        expect(screen.queryAllByText(/credits: 7/i)).toHaveLength(1);
    });
    test("resetting the course reverts edits", () => {
        const courseSwitch = screen.getByTestId("is-viewing-check110");
        courseSwitch.click();
        const editButton = screen.getByTestId("edit-course-button110");
        editButton.click();
        const namebox = screen.getByTestId("edit-name110");
        userEvent.type(namebox, "{selectall}{delete}new name");
        const descrbox = screen.getByTestId("edit-descr110");
        userEvent.type(descrbox, "{selectall}{delete}new descr");
        const creditsbox = screen.getByTestId("edit-credits110");
        userEvent.type(creditsbox, "{selectall}{delete}7");
        editButton.click();
        const resetButton = screen.getByTestId("reset-course110");
        resetButton.click();
        expect(
            screen.queryAllByText(/Analytic Geometry and Calculus A/i)
        ).toHaveLength(1);
        expect(
            screen.queryAllByText(
                /Functions, limits, continuity, derivatives./i
            )
        ).toHaveLength(1);
        expect(screen.queryAllByText(/credits: 4/i)).toHaveLength(1);
        expect(screen.queryAllByText(/new name/i)).toHaveLength(0);
        expect(screen.queryAllByText(/new descr/i)).toHaveLength(0);
        expect(screen.queryAllByText(/credits: 7/i)).toHaveLength(0);
    });
});
