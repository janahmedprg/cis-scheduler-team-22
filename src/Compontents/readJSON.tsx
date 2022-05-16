import { ImportCourse } from "../interfaces/Course";
//import { Course } from "../interfaces/Course";
import catalogData from "../catalog.json";
//import courseCategoriesData from "../courseCategories.json";

//reads in catalog data as hashmap of hashmaps
const catalog = catalogData as Record<string, Record<string, ImportCourse>>;

const departments = Object.keys(catalog);

const courseMaps = departments.map((dept: string): ImportCourse[] =>
    Object.values(catalog[dept])
);

const courseList = courseMaps.reduce(
    (fullList: ImportCourse[], currentList: ImportCourse[]) => [
        ...fullList,
        ...currentList
    ],
    []
);

export { courseList };

export { catalog };
