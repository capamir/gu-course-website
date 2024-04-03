import React from "react";
import { TeacherType } from "../../types/Product";
import Teacher from "./Teacher";

interface Props {
  teachers: TeacherType[];
}

const Teachers: React.FC<Props> = ({ teachers }) => {
  return (
    <>
      {teachers.map((teacher) => (
        <Teacher key={teacher.id} info={teacher} />
      ))}
    </>
  );
};

export default Teachers;
