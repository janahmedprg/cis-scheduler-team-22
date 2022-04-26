import { ImportCourse } from "../interfaces/Course";
//import { Course } from "../interfaces/Course";
import catalogData from "../catalog.json";
//import courseCategoriesData from "../courseCategories.json";

//reads in catalog data as hashmap of hashmaps
const catalog = catalogData as Record<string, Record<string, ImportCourse>>;

//const categories = Object.keys(courseCategoriesData);

//const courseCategories = courseCategoriesData as Record<string, string[]>;

/**
const courseArrList = categories.map((category: string): Course[] =>
    courseCategories[category].map(
        (code: string): Course => ({
            ...catalog[code.slice(0, 4)][code],
            degreeCategory: [category]
        })
    )
);
*/

export { catalog };

/**
//Get department keys

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
