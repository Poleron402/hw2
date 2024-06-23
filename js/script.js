let score = 0
const isFormValid= ()=>{
    let isValid = true
    if(document.getElementById("q1").value == ""){
        isValid = false
        document.getElementById("validationFeedback").textContent = "Question 1 was not answered"
    }
    return isValid
}

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
    if (q1Response === "sacramento"){
        answerFeedback(1, true)
    }else{
        answerFeedback(1, false)
    }
    // SECOND QUESTION VALIDATION
    let q2Response = document.getElementById("q2").value;
    if (q2Response === "mo"){
        answerFeedback(2, true)
    }else{
        answerFeedback(2, false)
    }
    // THIRD QUESTION VALIDATION
    if(document.getElementById("Jefferson").checked && document.getElementById("Roosevelt").checked && !document.getElementById("Jackson").checked && !document.getElementById("Franklin").checked){
        answerFeedback(3, true)
    }else{
        answerFeedback(3, false)
    }
    document.getElementById("totalScore").textContent = `Total score: ${score} pts`
    
}

document.querySelector("button").addEventListener("click", gradeQuiz)