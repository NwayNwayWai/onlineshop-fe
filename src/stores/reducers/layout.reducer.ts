import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CourseTab = "information" | "lectures" | "enrolled" | "rating";
type ProfileTab = "information" | "courses" | "apps" | "rating";
type StudentTab = "enrolled" | "rating";

interface InitialState {
  selectedCourseTab: CourseTab;
  selectedProviderTab: ProfileTab;
  selectedStudentTab: StudentTab;
}

const initialState: InitialState = {
  selectedCourseTab: "information",
  selectedProviderTab: "information",
  selectedStudentTab: "enrolled",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    courseTabSelect: (state, action: PayloadAction<CourseTab>) => {
      state.selectedCourseTab = action.payload;
    },
    profileTabSelect: (state, action: PayloadAction<ProfileTab>) => {
      state.selectedProviderTab = action.payload;
    },
    studentTabSelect: (state, action: PayloadAction<StudentTab>) => {
      state.selectedStudentTab = action.payload;
    },
  },
});

export const { courseTabSelect, profileTabSelect, studentTabSelect } =
  layoutSlice.actions;
export default layoutSlice.reducer;
