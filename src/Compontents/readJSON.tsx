import { ImportCourse } from "../interfaces/Course";
import catalogData from "../catalog.json";
//import courseCategoriesData from "../courseCategories.json";

//reads in catalog data as hashmap of hashmaps
const catalog = catalogData as Record<string, Record<string, ImportCourse>>;

export { catalog };
//const courseCategories = courseCategoriesData as Record<string, string[]>;

/**
//Get department keys
const categories = Object.keys(courseCategories);

//Map department keys to values. Gives array of arrays of courses
const courseList = catalog.reduce(
    (fullList: ImportCourse[], currentList: ImportCourse[]) => [
        ...fullList,
        ...currentList
    ],
    []
);
*/

//test
//console.log(courseList[0]);
