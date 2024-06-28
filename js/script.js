let score = 0
let attempts = localStorage.getItem("totalAttempts")
const color = 'brightness(0) saturate(100%) invert(33%) sepia(100%) saturate(7500%) hue-rotate(265deg) brightness(95%) contrast(110%)'

const isFormValid= ()=>{
    let isValid = true
    if(document.getElementById("q1").value == ""){
        isValid = false
        document.getElementById("validationFeedback").textContent = "Question 1 was not answered"
    }
    return isValid
}


const displayQ4And5Choices = ()=>{
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"]
    q4ChoicesArray = _.shuffle(q4ChoicesArray)

    for (let i=0; i<q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`
    }

    let q5ChoicesArr = [{"choice": "Alaska, Texas, California", "flag" : "ATC"},
        {"choice":"New York, Texas, Washington", "flag": "NTW"},
        {"choice":"California, Wyoming, Texas", "flag":"CWT"}]
    q5ChoicesArr = _.shuffle(q5ChoicesArr)
    q5ChoicesArr.forEach(item => {
        document.getElementById("q5Choices").innerHTML += `
        <input type="checkbox" id="${item.flag}">  <label for="${item.flag}"> ${item.choice} </label><br>
        `
    });
}
displayQ4And5Choices()
const answerFeedback = (index, correct) =>{
    if (correct){
        document.getElementById(`q${index}Feedback`).textContent = "Correct!"
        document.getElementById(`q${index}Feedback`).className = " bg-success text-white p-2 m-3 fs-4"
        document.getElementById(`markImg${index}`).innerHTML = "<img src='/img/checkmark.png' alt='checkmark'>"
        score += 10
    }else{
        document.getElementById(`q${index}Feedback`).textContent = "Incorrect!"
        document.getElementById(`q${index}Feedback`).className = " bg-warning text-white fs-4"
        document.getElementById(`markImg${index}`).innerHTML = "<img src='/img/xmark.png' alt='xmark'>"
    }
}
const q9Grading = () =>{
    
    let cali = document.getElementById('caliImg')
    console.log(cali)
    let florida = document.getElementById('floridaImg')
    let oregon = document.getElementById('oregonImg')
    florida.addEventListener("click", function(){
        cali.style.filter = 'invert(1)'
        oregon.style.filter = 'invert(1)'
        florida.style.filter = color
    })
    cali.addEventListener("click", function(){
        oregon.style.filter = 'invert(1)'
        florida.style.filter = 'invert(1)'
        cali.style.filter = color
    })
    oregon.addEventListener("click", function(){
        cali.style.filter = 'invert(1)'
        florida.style.filter = 'invert(1)'
        oregon.style.filter = color
    })
}
q9Grading()
//method to change the color upon click
const changeColor = (idClicked)=>{
    idClicked.style.filter = 'brightness(0) saturate(100%) invert(33%) sepia(100%) saturate(7500%) hue-rotate(265deg) brightness(95%) contrast(110%)'
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
    // FOURTH QUESTION VALIDATION
    let q4Response = document.querySelector("input[name=q4]:checked")
    if(q4Response){
        q4Response = q4Response.value
    } else{
        q4Response = null
    }
    q4Response == "Rhode Island"? answerFeedback(4, true) : answerFeedback(4, false)
    
    //FIFTH QUESTION VALIDATION
    document.getElementById("ATC").checked && !document.getElementById("NTW").checked && !document.getElementById("CWT").checked?answerFeedback(5, true):answerFeedback(5, false)
    //SIXTH QUESTION VALIDATION
    document.getElementById("q6").value == "Oregon"? answerFeedback(6, true) : answerFeedback(6, false)
    //SEVENTH QUESTION VALIDATION
    document.getElementById("q7").value == "WestV"? answerFeedback(7, true) : answerFeedback(7, false)
    //EIGHTH QUESTION VALIDATION
    document.getElementById("RGRiver").checked && !document.getElementById("MississippiRiver").checked && !document.getElementById("ColoradoRiver").checked && !document.getElementById("ArkansasRiver").checked ? answerFeedback(8, true) : answerFeedback(8, false)
    //NINETH QUESTION VALIDATION
    document.getElementById("floridaImg").style.filter == color? answerFeedback(9, true):answerFeedback(9, false)
    //TENTH QUESTION VALIDATION
    document.getElementById("Denali").checked && !document.getElementById("MWhitney").checked && !document.getElementById("MForaker").checked? answerFeedback(10, true):answerFeedback(10, false)
    document.getElementById("totalScore").textContent = `Total score: ${score} pts`
    if(score>=80){
        document.getElementById("congrats").innerHTML = "<h2>🎉CONGRATS!!! You scored high!🎉</h2>"
    }
    document.getElementById("totalAttempts").textContent = `Total Attempts: ${++attempts}`
    localStorage.setItem("totalAttempts", attempts)

}

document.querySelector("button").addEventListener("click", gradeQuiz)