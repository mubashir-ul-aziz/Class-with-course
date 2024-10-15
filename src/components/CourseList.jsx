import React, { useState } from 'react';
import CourseForm from './CourseForm';

function CourseList({ selectedClass, updateClass }) {
  const [editingCourse, setEditingCourse] = useState(null);

  const addCourse = (newCourse) => {
    const updatedCourses = [...selectedClass.courses, { ...newCourse, id: Date.now() }];
    updateClass({ ...selectedClass, courses: updatedCourses });
  };

  const deleteCourse = (id) => {
    const updatedCourses = selectedClass.courses.filter(c => c.id !== id);
    updateClass({ ...selectedClass, courses: updatedCourses });
  };

  const editCourse = (courseToEdit) => {
    setEditingCourse(courseToEdit);
  };

  const updateCourse = (updatedCourse) => {
    const updatedCourses = selectedClass.courses.map(c => 
      c.id === updatedCourse.id ? updatedCourse : c
    );
    updateClass({ ...selectedClass, courses: updatedCourses });
    setEditingCourse(null);
  };

  return (
    <div>
      <h3>Courses for {selectedClass.name}</h3>
      <CourseForm onSubmit={editingCourse ? updateCourse : addCourse} initialData={editingCourse} />
      <ul>
        {selectedClass.courses.map(course => (
          <li key={course.id}>
            {course.name}
            <button onClick={() => editCourse(course)}>Edit</button>
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
