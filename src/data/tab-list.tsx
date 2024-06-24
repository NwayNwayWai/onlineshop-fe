export interface CourseTab {
  label: string;
  value: "information" | "lectures" | "enrolled" | "rating";
}

export interface ProviderTab {
  label: string;
  value: "information" | "courses" | "apps" | "rating";
}
export interface StudentTab {
  label: string;
  value: "enrolled" | "rating";
}
export const courseTabItems: CourseTab[] = [
  {
    label: "Information",
    value: "information",
  },
  {
    label: "Lectures",
    value: "lectures",
  },
  {
    label: "Enrolled",
    value: "enrolled",
  },
  {
    label: "Rating",
    value: "rating",
  },
];

export const providerTabItems: ProviderTab[] = [
  {
    label: "Information",
    value: "information",
  },
  {
    label: "Courses",
    value: "courses",
  },
  {
    label: "Apps",
    value: "apps",
  },
  {
    label: "Rating",
    value: "rating",
  },
];
export const studentTabItems: StudentTab[] = [
  {
    label: "Enrolled Courses",
    value: "enrolled",
  },
  {
    label: "Rating",
    value: "rating",
  },
];
