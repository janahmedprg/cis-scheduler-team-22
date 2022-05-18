import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { App } from "../App";

describe("Course Pool Tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("107-degree-plan");
        currPlan.click();
    });
    test("Check existance of Course pool", () => {
        expect(screen.getAllByText("Course Pool")).toHaveLength(1);
        expect(screen.getAllByText(/clear course pool/i)).toHaveLength(1);
    });
    test("Check existance of buttons", () => {
        screen.getByTestId("is-viewing-check113").click();
        expect(screen.getAllByText("Move to Pool")).toHaveLength(1);
        screen.getByTestId("113-move-to-pool").click();
        expect(screen.queryAllByText(/MATH 210:/i)).toHaveLength(1);
        expect(screen.getAllByText("Add to semester")).toHaveLength(1);
        expect(screen.getByTestId("107-add-to-semester")).toBeInTheDocument();
    });
    test("Check for clear pool", () => {
        expect(screen.getByTestId("107-clear-pool")).toBeInTheDocument();
    });
    test("Check existance of dropdown", () => {
        screen.getByTestId("is-viewing-check110").click();
        expect(screen.getAllByText("Move to Pool")).toHaveLength(1);
        screen.getByTestId("110-move-to-pool").click();
        screen.getByTestId("semester-dropdown").click();
    });
    test("Check functionaility of clear pool", () => {
        screen.getByTestId("is-viewing-check113").click();
        expect(screen.getAllByText("Move to Pool")).toHaveLength(1);
        screen.getByTestId("113-move-to-pool").click();
        expect(screen.queryAllByText(/MATH 210:/i)).toHaveLength(1);
        expect(screen.getAllByText("Add to semester")).toHaveLength(1);
        screen.getByTestId("107-clear-pool").click();
        expect(screen.queryAllByText(/Add to semester/i)).toHaveLength(0);
        expect(screen.queryAllByText(/MATH 210:/i)).toHaveLength(0);
    });
    test("Test adding course from pool", () => {
        screen.getByTestId("is-viewing-check113").click();
        screen.getByTestId("113-move-to-pool").click();
        screen.getAllByText("fall 2022 semester")[1].click();
        screen.getByText("Add to semester").click();
        screen.getByTestId("109-edit-remove-semester").click();
        expect(screen.queryAllByText(/MATH 210:/i)).toHaveLength(0);
    });
});
