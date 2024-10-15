import React, { useState } from 'react';
import ClassForm from './ClassForm';
import CourseForm from './CourseForm';

function ClassList({ classes, setClasses }) {
  const [editingClass, setEditingClass] = useState(null);
  const [showClassForm, setShowClassForm] = useState(false);
  const [addingCourseForClass, setAddingCourseForClass] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addClass = (newClass) => {
    setClasses([...classes, { ...newClass, id: Date.now(), courses: [] }]);
    setShowClassForm(false);
  };

  const deleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const editClass = (classToEdit) => {
    setEditingClass(classToEdit);
    setShowClassForm(true);
    setIsEditing(true)
  };

  const updateClass = (updatedClass) => {
    setClasses(classes.map(c => c.id === updatedClass.id ? { ...c, ...updatedClass } : c));
    setEditingClass(null);
    setShowClassForm(false);
  };

  const addCourse = (newCourse) => {
    const updatedClasses = classes.map(c => 
      c.id === addingCourseForClass.id 
        ? { ...c, courses: [...c.courses, { ...newCourse, id: Date.now() }] }
        : c
    );
    setClasses(updatedClasses);
    setAddingCourseForClass(null);
  };

  const editCourse = (classId, course) => {
    setEditingCourse({ classId, course });
  };

  const updateCourse = (updatedCourse) => {
    const updatedClasses = classes.map(c => 
      c.id === editingCourse.classId
        ? { ...c, courses: c.courses.map(course => course.id === updatedCourse.id ? updatedCourse : course) }
        : c
    );
    setClasses(updatedClasses);
    setEditingCourse(null);
  };

  const deleteCourse = (classId, courseId) => {
    const updatedClasses = classes.map(c => 
      c.id === classId
        ? { ...c, courses: c.courses.filter(course => course.id !== courseId) }
        : c
    );
    setClasses(updatedClasses);
  };

  return (
    <div className='class-comp-modal'>
      <div className=" bottom-space create-class-name d-flex d-align-center d-justify-center d-gap ">
        <h2>Classes</h2>
        <button onClick={() => setShowClassForm(true)}>Create New Class</button>
      </div>
      {showClassForm && (
        <ClassForm 
          onSubmit={editingClass ? updateClass : addClass} 
          initialData={editingClass} 
          isEditing={isEditing}
          onCancel={() => {
            setShowClassForm(false);
            setEditingClass(null);
          }}
        />
      )}
      <ul>
        {classes.map(c => (
          <li key={c.id}>
            <div className=' bottom-space d-flex d-gap '>
              <div className='generated-li grow-1'>{c.name}</div>
              <div className=' d-flex d-gap'>
                <button onClick={() => editClass(c)}>Edit</button>
                <button onClick={() => deleteClass(c.id)}>Delete</button>
                <button onClick={() => setAddingCourseForClass(c)}>Create Course</button>
              </div>
            </div>
            {addingCourseForClass && addingCourseForClass.id === c.id && (
              <CourseForm 
                onSubmit={addCourse} 
                onCancel={() => setAddingCourseForClass(null)}
              />
            )}
            {c.courses.length > 0 && (
              <ul>
                {c.courses.map(course => (
                  <li key={course.id}>
                    {editingCourse && editingCourse.course.id === course.id ? (
                      <CourseForm 
                        onSubmit={updateCourse} 
                        initialData={course}
                        isEditing={isEditing}
                        onCancel={() => setEditingCourse(null)}
                      />
                    ) : (
                      <>
                      <div className=' bottom-space d-flex d-gap '>
                        <div className='generated-li grow-1'>{course.name}</div>
                        <div className=' d-flex d-gap'>
                          <button onClick={() => editCourse(c.id, course)}>Edit course</button>
                          <button onClick={() => deleteCourse(c.id, course.id)}>Delete</button>
                        </div>
                      </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
