import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { App } from "../App";
import userEvent from "@testing-library/user-event";

describe("ViewDegreePlansList Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Testing existance of buttons and forms", () => {
        expect(
            screen.getByTestId("edit-switch-degreePlansList")
        ).toBeInTheDocument();
        expect(screen.getByTestId("107-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("0-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("107-csv-link")).toBeInTheDocument();
        expect(screen.getByTestId("0-csv-link")).toBeInTheDocument();
        expect(screen.queryByTestId("107-delete-plan")).toBeFalsy();
        expect(screen.queryByTestId("0-delete-plan")).toBeFalsy();
        expect(screen.queryByTestId("add-close-degree-plan")).toBeFalsy();
        expect(screen.queryByTestId("new-degree-plan-degree")).toBeFalsy();
        expect(screen.queryByTestId("new-degree-plan-name")).toBeFalsy();
        expect(screen.queryByTestId("add-to-degree-plan")).toBeFalsy();
    });
    test("Testing edit switch", () => {
        expect(screen.getByTestId("107-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("0-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("107-csv-link")).toBeInTheDocument();
        expect(screen.getByTestId("0-csv-link")).toBeInTheDocument();
        expect(screen.queryByTestId("107-delete-plan")).toBeFalsy();
        expect(screen.queryByTestId("0-delete-plan")).toBeFalsy();
        expect(screen.queryByTestId("add-close-degree-plan")).toBeFalsy();
        expect(screen.queryByTestId("new-degree-plan-degree")).toBeFalsy();
        expect(screen.queryByTestId("new-degree-plan-name")).toBeFalsy();
        expect(screen.queryByTestId("add-to-degree-plan")).toBeFalsy();

        screen.getByTestId("edit-switch-degreePlansList").click();

        expect(screen.getByTestId("107-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("0-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("107-csv-link")).toBeInTheDocument();
        expect(screen.getByTestId("0-csv-link")).toBeInTheDocument();
        expect(screen.getByTestId("107-delete-plan")).toBeInTheDocument();
        expect(screen.getByTestId("0-delete-plan")).toBeInTheDocument();
        expect(screen.getByTestId("add-close-degree-plan")).toBeInTheDocument();
        expect(screen.queryByTestId("new-degree-plan-degree")).toBeFalsy();
        expect(screen.queryByTestId("new-degree-plan-name")).toBeFalsy();
        expect(screen.queryByTestId("add-to-degree-plan")).toBeFalsy();

        screen.getByTestId("edit-switch-degreePlansList").click();

        expect(screen.getByTestId("107-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("0-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("107-csv-link")).toBeInTheDocument();
        expect(screen.getByTestId("0-csv-link")).toBeInTheDocument();
        expect(screen.queryByTestId("107-delete-plan")).toBeFalsy();
        expect(screen.queryByTestId("0-delete-plan")).toBeFalsy();
        expect(screen.queryByTestId("add-close-degree-plan")).toBeFalsy();
        expect(screen.queryByTestId("new-degree-plan-degree")).toBeFalsy();
        expect(screen.queryByTestId("new-degree-plan-name")).toBeFalsy();
        expect(screen.queryByTestId("add-to-degree-plan")).toBeFalsy();
    });
    test("Testing view plan", () => {
        expect(screen.getByTestId("0-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("107-degree-plan")).toBeInTheDocument();
        expect(screen.queryAllByText("Math test plan")).toHaveLength(1);
        expect(
            screen.queryAllByText("Computer Science Degree Plan")
        ).toHaveLength(0);

        screen.getByTestId("0-degree-plan").click();

        expect(screen.queryAllByText("Math test plan")).toHaveLength(0);
        expect(
            screen.queryAllByText("Computer Science Degree Plan")
        ).toHaveLength(1);

        screen.getByTestId("107-degree-plan").click();

        expect(screen.queryAllByText("Math test plan")).toHaveLength(1);
        expect(
            screen.queryAllByText("Computer Science Degree Plan")
        ).toHaveLength(0);
    });
    test("Testing delete plan", () => {
        expect(screen.getByTestId("0-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("107-degree-plan")).toBeInTheDocument();
        expect(screen.queryAllByText(/Math test plan/)).toHaveLength(2);
        expect(
            screen.queryAllByText(/Computer Science Degree Plan/)
        ).toHaveLength(1);

        screen.getByTestId("edit-switch-degreePlansList").click();
        screen.getByTestId("0-delete-plan").click();
        expect(screen.queryByTestId("0-degree-plan")).toBeFalsy();
        expect(
            screen.queryAllByText(/Computer Science Degree Plan/)
        ).toHaveLength(0);
        screen.getByTestId("107-delete-plan").click();
        expect(screen.queryByTestId("107-degree-plan")).toBeFalsy();
        expect(screen.queryAllByText(/Math test plan/)).toHaveLength(0);
    });
    test("Testing add plan", () => {
        expect(screen.getByTestId("0-degree-plan")).toBeInTheDocument();
        expect(screen.getByTestId("107-degree-plan")).toBeInTheDocument();
        expect(screen.queryAllByText(/Math test plan/)).toHaveLength(2);
        expect(
            screen.queryAllByText(/Computer Science Degree Plan/)
        ).toHaveLength(1);
        expect(screen.queryAllByText(/Biology/)).toHaveLength(0);

        screen.getByTestId("edit-switch-degreePlansList").click();
        screen.getByTestId("add-close-degree-plan").click();
        // const degree = screen.getByTestId("new-degree-plan-degree");
        // const degreeName = screen.queryAllByTestId("new-degree-plan-name");
        // userEvent.type(degree, "{selectall}{del}Bachelor of Science");
        // userEvent.type(degreeName, "{selectall}{del}Biology");
        // screen.getByTestId("add-to-degree-plan").click();
        // expect(screen.queryAllByText(/Biology/)).toHaveLength(1);
    });
});
