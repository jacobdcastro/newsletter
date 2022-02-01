import React from 'react'
import s from './SubmitButton.module.css'

export default function SubmitButton(props) {


  return (
    <div className={s.root}>
      <button className={s.submitButton}>
        <span className={s.buttonText}>{props.text}</span></button>
    </div>
  );
}
