

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
    let array = ['First Name', 'Last Name', 'Age', 'Address', 'job Description']
    for (let i = 0; i < array.length; i++) {
        dataInput[`${array[i]}`] = nodeRefs[`input${i}`].value
    };
    console.log(dataInput)
});


console.log(nodeRefs)
console.log(object)

