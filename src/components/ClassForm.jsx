import React, { useState, useEffect } from 'react';

function ClassForm({ onSubmit, initialData, onCancel, isEditing }) {
  const [className, setClassName] = useState('');

  useEffect(() => {
    if (initialData) {
      setClassName(initialData.name);
    }
    if (isEditing) {
      const inputField = document.getElementById('class_name');
      if (inputField) {
        inputField.focus();
      }
    }
  }, [initialData, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: className, id: initialData ? initialData.id : null });
    setClassName('');
  };

  return (
    <form onSubmit={handleSubmit} className='bottom-space d-flex d-gap'>
      <div className='input-sty'>
      <input
        type="text"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder=""
        required
         class="effect-21"
         id='class_name'
      />
      <label>Enter class name</label>
      <span class="focus-border">
            	<i></i>
            </span></div>
        <div className='form-butn-div d-flex d-gap '>

      <button type="submit">{initialData ? 'Update' : 'Add'} Class</button>
      <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    </form>
  );
}

export default ClassForm;
