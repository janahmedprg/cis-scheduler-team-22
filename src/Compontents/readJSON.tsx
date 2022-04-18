import { Course } from "../interfaces/Course";
import catalogData from "../catalog.json";

/**
//reads in catalog data as hashmap of hashmaps
const catalog = catalogData as Record<string, Record<string, Course>>;

//Get department keys
const departments = Object.keys(catalog);

//Map department keys to values. Gives array of arrays of courses
const courseInfo = departments.map((dept: string): Course[] =>
    Object.values(catalog[dept])
);

const courseList = courseInfo.reduce(
    (fullList: Course[], currentList: Course[]) => [
        ...fullList,
        ...currentList
    ],
    []
);

console.log(courseList[0]);
*/
