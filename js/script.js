let score = 0
let attempts = localStorage.getItem("totalAttempts")

const isFormValid= ()=>{
    let isValid = true
    if(document.getElementById("q1").value == ""){
        isValid = false
        document.getElementById("validationFeedback").textContent = "Question 1 was not answered"
    }
    return isValid
}


const displayQ4Choices = ()=>{
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"]
    q4ChoicesArray = _.shuffle(q4ChoicesArray)

    for (let i=0; i<q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`
    }
}
displayQ4Choices()
const answerFeedback = (index, correct) =>{
    if (correct){
        document.getElementById(`q${index}Feedback`).textContent = "Correct!"
        document.getElementById(`q${index}Feedback`).className = " bg-success text-white p-2 m-3 fs-4"
        document.getElementById(`markImg${index}`).innerHTML = "<img src='/img/checkmark.png' alt='checkmark'>"
        score += 20
    }else{
        document.getElementById(`q${index}Feedback`).textContent = "Incorrect!"
        document.getElementById(`q${index}Feedback`).className = " bg-warning text-white p-2 m-3 fs-4"
        document.getElementById(`markImg${index}`).innerHTML = "<img src='/img/xmark.png' alt='xmark'>"
    }
}
const gradeQuiz = ()=>{
    score = 0
    console.log("Grading quiz...")
    document.getElementById("validationFeedback").textContent = ""
    if (!isFormValid())
        return
    
    // FIRST QUESTION VALIDATION
    let q1Response = document.getElementById("q1").value.toLowerCase()
    // console.log(q1Response)
    q1Response === "sacramento" ? answerFeedback(1, true) : answerFeedback(1, false)
    
    // SECOND QUESTION VALIDATION
    let q2Response = document.getElementById("q2").value;
    q2Response === "mo" ? answerFeedback(2, true) : answerFeedback(2, false)
    // THIRD QUESTION VALIDATION
    document.getElementById("Jefferson").checked && document.getElementById("Roosevelt").checked 
    && !document.getElementById("Jackson").checked 
    && !document.getElementById("Franklin").checked ? answerFeedback(3, true) : answerFeedback(3, false)
    let q4Response = document.querySelector("input[name=q4]:checked").value
    q4Response == "Rhode Island"? answerFeedback(4, true) : answerFeedback(4, false)
    document.getElementById("totalScore").textContent = `Total score: ${score} pts`
    document.getElementById("totalAttempts").textContent = `Total Attempts: ${++attempts}`
    localStorage.setItem("totalAttempts", attempts)
}

document.querySelector("button").addEventListener("click", gradeQuiz)