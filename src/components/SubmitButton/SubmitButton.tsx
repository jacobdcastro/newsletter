import React from 'react'
import s from './SubmitButton.module.css'

const SubmitButton = () => {

  return (
    <div className={s.root}>
      <button className={s.submitButton}>
        <span className={s.buttonText}>Submit a Task</span></button>
    </div>
  )
}

export default SubmitButton
