import React, { useState, useEffect } from 'react';

function CourseForm({ onSubmit, initialData, onCancel, isEditing }) {
  const [courseName, setCourseName] = useState('');
  
console.log(isEditing)
  useEffect(() => {
    if (initialData) {
      setCourseName(initialData.name);
    }
    if (isEditing) {
      const inputField = document.getElementById('course_name');
      if (inputField) {
        inputField.focus();
      }
    }
  }, [initialData, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: courseName, id: initialData ? initialData.id : null });
    setCourseName('');
  };

  return (
    <form onSubmit={handleSubmit} className=' bottom-space d-flex d-gap'>
      <div className='input-sty'>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder=""
        required
        className="effect-21"
        id='course_name'
      />
      <label>Enter course name</label>
      <span className="focus-border">
            	<i></i>
            </span></div>
            <div className='form-butn-div d-flex d-gap '>
      <button type="submit">{initialData ? 'Update' : 'Add'} Course</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default CourseForm;
