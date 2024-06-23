
const isFormValid= ()=>{
    let isValid = true
    if(document.getElementById("q1").value == ""){
        isValid = false
        document.getElementById("validationFeedback").textContent = "Question 1 was not answered"
    }
    return isValid
}
const gradeQuiz = ()=>{
    console.log("Grading quiz...")
    document.getElementById("validationFeedback").textContent = ""
    if (!isFormValid())
        return
    let q1Response = document.getElementById("q1").value
    console.log(q1Response)
}

document.querySelector("button").addEventListener("click", gradeQuiz)