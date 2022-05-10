import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
import userEvent from "@testing-library/user-event";

describe("ViewDegreePlansList Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("107-degree-plan").click();
        screen.getByTestId("107-add-course-degree-plan").click();
    });
    test("Testing existance of forms and buttons", () => {
        expect(screen.getByTestId("107-add-course-code")).toBeInTheDocument();
        expect(screen.getByTestId("107-add-course-number")).toBeInTheDocument();
        expect(screen.getByTestId("107-add-course-search")).toBeInTheDocument();
    });
    test("Testing search", () => {
        const code = screen.getByTestId("107-add-course-code");
        userEvent.type(code, "{selectall}{del}musc");
        screen.getByTestId("107-add-course-search").click();
        expect(screen.queryAllByText(/musc/i)).toHaveLength(456);
        screen.getByTestId("107-add-course-search-close").click();
        userEvent.type(screen.getByTestId("107-add-course-number"), "108");
        userEvent.type(
            screen.getByTestId("107-add-course-code"),
            "{selectall}{del}cisc"
        );
        screen.getByTestId("107-add-course-search").click();
        expect(screen.queryAllByText(/CISC 108/i)).toHaveLength(2);
        screen.getByTestId("107-add-course-search-close").click();
        userEvent.type(
            screen.getByTestId("107-add-course-code"),
            "{selectall}{del}vldk"
        );
        screen.getByTestId("107-add-course-search").click();
        expect(screen.queryAllByText(/Course not found/i)).toHaveLength(1);
        screen.getByTestId("107-add-course-search-close").click();
        userEvent.type(
            screen.getByTestId("107-add-course-code"),
            "{selectall}{del}vldk"
        );
        userEvent.type(
            screen.getByTestId("107-add-course-number"),
            "{selectall}{del}"
        );
        screen.getByTestId("107-add-course-search").click();
        expect(screen.queryAllByText(/Error:/i)).toHaveLength(1);
    });
    test("Testing adding", () => {
        expect(screen.queryAllByText(/CISC 108/i)).toHaveLength(0);
        userEvent.type(screen.getByTestId("107-add-course-number"), "108");
        userEvent.type(
            screen.getByTestId("107-add-course-code"),
            "{selectall}{del}cisc"
        );
        screen.getByTestId("107-add-course-search").click();
        const drop = screen.getByLabelText("Select the semester to add to");
        drop.click();
        expect(screen.queryAllByText(/fall 2022 semester/i)).toHaveLength(2);
        expect(screen.queryAllByText(/spring 2023 semester/i)).toHaveLength(2);
        expect(screen.queryAllByText(/fall 2023 semester/i)).toHaveLength(2);
        const sel = screen.getAllByText(/spring 2023 semester/i);
        sel[1].click();
        const addB = screen.getByText("Add CISC 108");
        addB.click();
        screen.getByText("Close Course Search").click();
        expect(screen.queryAllByText(/CISC 108/i)).toHaveLength(1);
        const del = screen.getByTestId("109-edit-remove-semester");
        del.click();
        expect(screen.queryAllByText(/CISC 108/i)).toHaveLength(0);
        expect(screen.queryAllByText(/spring 2023 semseter/i)).toHaveLength(0);
    });
});
