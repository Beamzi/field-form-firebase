
const firebaseConfig = {

    apiKey: "AIzaSyCdVNrmJIJ1__FZA9-1H50ZmXiwqD7whH4",
    authDomain: "field-form-generator.firebaseapp.com",
    projectId: "field-form-generator",
    storageBucket: "field-form-generator.appspot.com",
    messagingSenderId: "480037229115",
    appId: "1:480037229115:web:ce161b15b19a309018021e",
    measurementId: "G-SRDXVVY0P8"
  
  };

    const app = firebase.initializeApp(firebaseConfig);
    const analytics = firebase.analytics();


object = {}
nodeRefs = {};
dataInput = {};


// injects field-form into the DOM with auto labels, stores nodes referenced in 'object' & 'nodeRefs'
const fieldGen = () => {
    const body = document.querySelector('body')
    object.section = body.appendChild(document.createElement('section'));

    for (let i = 0; i < 5; i++) {
        object[`input${i}`] = document.createElement('input');
        object.br = document.createElement('br');
        object[`title${i}`] = document.createElement('h3')
        object.section.append(object[`title${i}`], object[`input${i}`], object.br);
        object[`input${i}`].classList.add(`input${i}`);
        let array = ['First Name', 'Last Name', 'age', 'address', 'job description']

        for (let j = 0; j < array.length; j++) {
            if (i === j)
            object[`title${i}`].textContent = array[j];
        };

        nodeRefs[`input${i}`] = document.querySelector(`.input${i}`)
    };

    object.submit = object.section.appendChild(document.createElement('button'))
    object.submit.innerHTML = 'submit'
    object.submit.style['margin-top'] = '20px';
};
fieldGen();



//stores input data in 'datainput' on button click, labels 

object.submit.addEventListener('click', () => {
    event.preventDefault();
    let dataInputJSON
    let array = ['First Name', 'Last Name', 'Age', 'Address', 'job Description']
    for (let i = 0; i < array.length; i++) {
        dataInput[`${array[i]}`] = nodeRefs[`input${i}`].value
    };

    dataInputJSON = JSON.stringify(dataInput);
    console.log(dataInputJSON);


    // Call your cloud function here and pass dataInputJSON
    // Replace 'your-cloud-function-url' with your actual cloud function URL
    // Determine the correct URL based on the environment

    /*
  const isLocal = location.hostname === "localhost";
  const cloudFunctionURL = isLocal 
    ? 'http://localhost:5001/field-form-generator/sendJsonToEmail'
    : 'https://us-central1-field-form-generator.cloudfunctions.net/sendJsonToEmail';
    */

    //http://localhost:5001/field-form-generator/sendJsonToEmail
    
    fetch('http://127.0.0.1:5001/field-form-generator/us-central1/sendJsonToEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataInputJSON
    })

    .then(response => {
        if (response.ok) {
            console.log('Data sent successfully!');
        } else {
            console.error('Failed to send data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });


    analytics.logEvent('submit_form', {
        // Include any relevant parameters or data
        form_data: dataInput    
    });
    



    console.log(dataInput)
});



console.log(nodeRefs)
console.log(object)

