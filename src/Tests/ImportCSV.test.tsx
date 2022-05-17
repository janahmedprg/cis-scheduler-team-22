import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
//import userEvent from "@testing-library/user-event";

describe("Import CSV Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Testing for import button existence", () => {
        expect(screen.getByTestId("import-button")).toBeInTheDocument();
        expect(screen.queryAllByText(/Import Plan as CSV/)).toHaveLength(1);
    });
    test("Testing for upload button existence", () => {
        const importButton = screen.getByTestId("import-button");
        importButton.click();
        expect(screen.getByTestId("upload-button")).toBeInTheDocument();
        expect(screen.queryAllByText(/Upload a file/)).toHaveLength(1);
        expect(screen.queryAllByText(/Upload Plan From CSV/)).toHaveLength(1);
        expect(screen.queryAllByText(/Close Import/)).toHaveLength(1);
    });
    test("Testing uploading a plan", () => {
        expect(screen.queryAllByText(/View Plan/)).toHaveLength(2);
        const importButton = screen.getByTestId("import-button");
        importButton.click();
        const uploadButton = screen.getByTestId("upload-button");
        uploadButton.click();
        /*Test here the actual import of data from the CSV when upload button is clicked and data added to degree plans list*/
    });
});
