'use strict';

var throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('.feedback-form input');
const textareaRef = document.querySelector('.feedback-form textarea');
const submitRef = document.querySelector('.feedback-form button');
const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = {};

loadContentToForm();

function onInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem('LOCALSTORAGE_KEY', JSON.stringify(formData));
}

function loadContentToForm() {
  const loadedContent = localStorage.getItem('LOCALSTORAGE_KEY');
  const loadedContentForm = JSON.parse(loadedContent);
  // console.log(loadedContentForm);

  if (loadedContentForm) {
    formData = loadedContentForm;
    if (formData.email) {
      inputRef.value = formData.email;
    }
    if (formData.message) {
      textareaRef.value = formData.message;
    }
  }
}

function onSubmit(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem('LOCALSTORAGE_KEY');
  console.log(formData);
}

formRef.addEventListener('input', throttle(onInput, 500));
formRef.addEventListener('submit', onSubmit);
