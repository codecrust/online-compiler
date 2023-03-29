API_KEY = "e81b1c7bf8mshcb853477b02ef3ap1e5a73jsn45c6c7f5cdcb"
//"3a741d4f13msh46af1ea44bc1bdcp1bf020jsnf18723627030";


//console.log(questionsData)
//import json from questions.json
//select random question
let randomQuestionIndex = Math.floor(Math.random() * questionsData.length)
let questionObj = questionsData[randomQuestionIndex]
//console.log(questionObj)
let question = questionObj.question

//iterate questionObj.testcasesList and create testCasesObjAr
let testCasesObjAr = []

for (let i = 0; i < questionObj.testcasesList.length; i++) {
    testCasesObjAr.push({
        input: questionObj.testcasesList[i].input,
        expectedOutput: questionObj.testcasesList[i].output,
        stdout: "",
        output: "-",
        token: "",
        result: "Pending"
    })
}
let pendingCaseFlag = false
let codeSubmittedFlag = false



let currentSelectedLang = "JavaScript"
let argsName = "nums"


//add question to questionDiv
document.getElementById("questionDiv").innerText = question

//add event listener to language dropdown
document.getElementById("lang").addEventListener("change", function () {
    console.log(this.value)
    currentSelectedLang = this.value
    updateSourceCodeArea(this.value)
})
let editor = ace.edit("editor");
editor.setTheme("ace/theme/amber");
editor.session.setMode("ace/mode/javascript");
document.getElementById('editor').style.fontSize = '15px';


function updateSourceCodeArea(lang) {
    if (lang == "JavaScript") {
        editor.setValue(`function ${questionObj.methodName}(${argsName})\n{\n\t\n}`)
    }
    else if (lang == "Java") {
        document.getElementById("source").value =
            `
        class Main{
            public static void main(String[] args) {
                UserSolution obj = new UserSolution();
                System.out.println(obj.${questionObj.methodName}(${argsName}));
        }

        class UserSolution{
            public ${questionObj.returnType} ${questionObj.methodName}(${argsName}){

            }
        }
        `

    }
}


updateSourceCodeArea(currentSelectedLang)




var language_to_id = {
    "Bash": 46,
    "C": 50,
    "C#": 51,
    "C++": 54,
    "Java": 62,
    "Python": 71,
    "Ruby": 72,
    "javascript": 63
};

function encode(str) {
    return btoa(unescape(encodeURIComponent(str || "")));
}

function decode(bytes) {
    var escaped = escape(atob(bytes || ""));
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
}

// function errorHandler(jqXHR, textStatus, errorThrown) {
//     $("#output").val(`${JSON.stringify(jqXHR, null, 4)}`);
//     $("#run").prop("disabled", false);
// }





function check(token) {
    //$("#output").val($("#output").val() + "\n⏬ Checking status for..." + token);


    //convert above code to fetch
    fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,language_id`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        }
    }).then(res => res.json())

        .then(response => {
            console.log(response)
            let status = statusIdObj.find(obj => obj.id == response.status_id)


            let stdOut = "";

            try {
                console.log(response.stdout)

                stdOut = JSON.stringify(JSON.parse(response.stdout))
            } catch (error) {
                //   console.log("error caught")
                stdOut = (response.stdout).trim().toString().trim()
            }

            testCasesObjAr.forEach(testCaseObj => {
                if (testCaseObj.token == token) {
                    testCaseObj.stdout = stdOut
                }
            })

            if (response.status_id == 3) {


                //document.getElementById("output").value = document.getElementById("output").value + `\noutput:\n ${stdOut}`;

                testCasesObjAr.forEach(testCaseObj => {
                    if (testCaseObj.token == token) {
                        let lastLine = stdOut.split("\n").pop()
                        testCaseObj.output = lastLine;
                    }
                })

            }
            else if (response.status_id == 1 || response.status_id == 2) {
                setTimeout(function () { check(token) }, 2000);
                testCasesObjAr.forEach(testCaseObj => {
                    if (testCaseObj.token == token)
                        testCaseObj.output = status.description;
                })
            }
            else if (response.status_id != null) {
                testCasesObjAr.forEach(testCaseObj => {
                    if (testCaseObj.token == token)
                        testCaseObj.output = status.description;
                })

                // document.getElementById("output").value = document.getElementById("output").value + `\noutput:\n ${status.description}`;
            }
            else {
                testCasesObjAr.forEach(testCaseObj => {
                    if (testCaseObj.token == token)
                        testCaseObj.output = "Error";
                })

                // document.getElementById("output").value = document.getElementById("output").value + `\nsoutput:\n ${response.stderr}`;
            }
            addTestCasesTable()


        })
        .catch(err => {

            console.error(err);

        });
}



function checkBatch() {

    let tokenStr = ""

    //iterate on testcasesobjar and add token to tokenStr
    for (let i = 0; i < testCasesObjAr.length; i++) {
        tokenStr += testCasesObjAr[i].token
        if (i < testCasesObjAr.length - 1)
            tokenStr += ","
    }
    console.log(tokenStr)


    //$("#output").val($("#output").val() + "\n⏬ Checking status for..." + tokenStr);

    //convert above code to fetch
    fetch(`https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${tokenStr}?base64_encoded=false&fields=stdout,stderr,compile_output,status_id,language_id`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        }
    }).then(res => res.json())

        .then(response => {
            console.log(response)
            response = response.submissions

            for (let i = 0; i < response.length; i++) {

                if (response[i] == null) {
                    setTimeout(() => {
                        check(testCasesObjAr[i].token)
                    }, 2000);
                    continue
                }

                let status = statusIdObj.find(obj => obj.id == response[i].status_id)


                let stdOut = "";
                let token = testCasesObjAr[i].token

                try {

                    stdOut = JSON.stringify(JSON.parse(response[i].stdout))
                } catch (error) {
                    stdOut = response[i].stdout.toString().trim()
                }

                testCasesObjAr.forEach(testCaseObj => {
                    if (testCaseObj.token == token) {
                        testCaseObj.stdout += stdOut;
                    }
                })

                if (response[i].status_id == 3) {

                    testCasesObjAr.forEach(testCaseObj => {
                        if (testCaseObj.token == token) {

                            //get last line from stdOut
                            let lastLine = stdOut.split("\n").pop()

                            testCaseObj.output = lastLine;
                        }
                    })

                }
                else if (response[i].status_id == 1 || response[i].status_id == 2) {
                    setTimeout(function () { check(token) }, 2000);
                    testCasesObjAr.forEach(testCaseObj => {
                        if (testCaseObj.token == token)
                            testCaseObj.output = "Processing";
                    })
                }
                else if (response[i].status_id != null) {
                    testCasesObjAr.forEach(testCaseObj => {
                        if (testCaseObj.token == token)
                            testCaseObj.output = status.description;
                    })

                    //  document.getElementById("output").value = document.getElementById("output").value + `\noutput:\n ${status.description}`;
                }
                else {
                    testCasesObjAr.forEach(testCaseObj => {
                        if (testCaseObj.token == token)
                            testCaseObj.output = "Error";
                    })

                    // document.getElementById("output").value = document.getElementById("output").value + `\noutput:\n ${response[i].stderr}`;
                }
            }
            addTestCasesTable()


        })
        .catch(err => {
            console.error(err);

        });
}

function run(testObj) {

    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-host", " judge0-ce.p.rapidapi.com");
    myHeaders.append("x-rapidapi-key", API_KEY);
    myHeaders.append("Content-Type", "application/json");

    let inputAr = testObj.input;


    var raw = {
        submissions: [{
            "language_id": language_to_id[document.getElementById("lang").value],
            "source_code": encode(editor.getValue() + `\n console.log(testFunction(JSON.parse(\'${JSON.stringify(inputAr)}')))`),
            // \"stdin\": encode($(\"#input\").val()),\r\n    
            //  \"expected_output\": encodedExpectedOutput,\r\n   
            "redirect_stderr_to_stdout": true
        }]
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };

    fetch("https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=true&wait=false", requestOptions)
        .then(response => response.json())
        .then(data => {

            console.log(data)


            testObj.token = data.token;
            document.getElementById("output").value += "\n🎉 Submission created."
            setTimeout(function () { check(data.token) }, 2000)

        })
        .catch(error => console.log('error', error));

}

let isRunningFlag = false
console.log(document.getElementById("lang").value)
console.log(language_to_id[document.getElementById("lang").value])
function runBatched() {

    isRunningFlag = true;
    pendingCaseFlag = true;
    codeSubmittedFlag = false;

    testCasesObjAr.forEach(testObj => {
        testObj.stdout = "";
        testObj.output = "-";
    })

    addTestCasesTable()


    setTimeout(() => {
        processingIconStateChange();
    }, 500)
    addTestCasesTable()
    //disable run button
    document.getElementById("run").disabled = true;


    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-host", "judge0-ce.p.rapidapi.com");
    myHeaders.append("x-rapidapi-key", API_KEY);
    myHeaders.append("Content-Type", "application/json");



    var raw = {
        submissions: []
    }

    testCasesObjAr.forEach(testObj => {
        raw.submissions.push({
            "language_id": language_to_id[document.getElementById("lang").value],
            "source_code": encode(editor.getValue() + `\n console.log(${questionObj.methodName}(JSON.parse(\'${JSON.stringify(testObj.input)}')))`),
            // \"stdin\": encode($(\"#input\").val()),\r\n
            //  \"expected_output\": encodedExpectedOutput,\r\n
            "redirect_stderr_to_stdout": true
        })
    })


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };
    fetch("https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true&wait=false", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            setTimeout(() => {
                checkBatch()
            }, 5000);

            //  iterate on data as array
            for (let i = 0; i < data.length; i++) {
                testCasesObjAr[i].token = data[i].token;
                //setTimeout(function () { check(data[i].token) }, 2000)

            }

            //document.getElementById("output").value += "\n🎉 Submission created."

        })
        .catch(error => console.log('error', error));





}





function addTestCasesTable() {

    let tempPendingCase = false



    document.getElementById("testCaseDiv").innerHTML =
        `<table class="table rounded table-striped-columns table-bordered" id="test-cases-table">
    <thead>
        <tr>
            <th>Input</th>
            <th>Expected</th>

            <th>Output</th>
            <th>Result</th>
        </tr>
    </thead>
    <tbody class="table-group-divider">


${testCasesObjAr.map((testCaseObj, index) => {



            //  console.log("Comparing: " + testCaseObj.expectedOutput + " with " + testCaseObj.output);

            if ((testCaseObj.expectedOutput) == (testCaseObj.output))
                testCaseObj.result = "✅"
            else if (testCaseObj.output == "Processing" || testCaseObj.output == "-") {

                tempPendingCase = true

                if (isRunningFlag) {
                    testCaseObj.result = processingIcon
                }

            } else {
                testCaseObj.result = "❌"
            }


            return `<tr id= test-case-${index} data-toggle="collapse" data-target="#${"test-" + index}-details" class="clickable">
    <td class="text-center">${JSON.stringify(testCaseObj.input)}</td>
    <td class="text-center">${testCaseObj.expectedOutput}</td>
    <td class="text-center">${testCaseObj.output}</td>
    <td class="text-center">${testCaseObj.result}</td>
</tr>
<tr>
<td colspan="3" class="hiddenRow">
  <div id=${"test-" + index}-details class="collapse">
  </div>
</td>
</tr>`
        }).join('')



        }

</tbody >
</table > `


    // add test case details to div
    testCasesObjAr.forEach((testCaseObj, index) => {
        document.getElementById(`test-${index}-details`).innerHTML = `<pre><small>${testCaseObj.stdout}</small></pre>`
    })

    document.querySelectorAll(".clickable").forEach((el) => {
        el.addEventListener("click", () => {
            el.nextElementSibling.querySelector(".collapse").classList.toggle("show")
        })
    })
    pendingCaseFlag = tempPendingCase

    if (!pendingCaseFlag) {

        console.log("all cases resolved")
        isRunningFlag = false
        document.getElementById("test-case-0").nextElementSibling.querySelector(".collapse").classList.toggle("show")
        submitCode()
        //enable run button
        document.getElementById("run").disabled = false;
    }

}

addTestCasesTable()






function showInitialModal() {
    document.addEventListener('DOMContentLoaded', function () {
        var modal = new bootstrap.Modal(document.getElementById('exampleModal'));

        // Show the modal on page load
        modal.show();

        // Enable the "Save changes" button only if both the name and email fields are filled in
        var nameInput = document.getElementById('nameInput');
        var emailInput = document.getElementById('emailInput');
        var submitBtn = document.getElementById('submitBtn');

        function toggleSubmitBtn() {
            submitBtn.disabled = nameInput.value === '' || emailInput.value === '';
        }

        nameInput.addEventListener('input', toggleSubmitBtn);
        emailInput.addEventListener('input', toggleSubmitBtn);

        // When the "Save changes" button is clicked, submit the form and close the modal
        submitBtn.addEventListener('click', function () {
            if (nameInput.value !== '' && emailInput.value !== '') {
                modal.hide();
                submitUser()
            }
        });
    });
}

let processingIcon = "•"

//convert above setInterval to a function and call it from here
function processingIconStateChange() {

    if (processingIcon == "•")
        processingIcon = "••"
    else if (processingIcon == "••")
        processingIcon = "•••"
    else if (processingIcon == "•••")
        processingIcon = "••••"
    else if (processingIcon == "••••")
        processingIcon = "•"

    addTestCasesTable()

    if (pendingCaseFlag)
        setTimeout(() => {
            processingIconStateChange();
        }, 500)
}



showInitialModal()

function showCountDown() {
    var countdownTime = 15 * 60;

    // Update the countdown timer every second
    var countdownInterval = setInterval(function () {
        // Calculate the minutes and seconds remaining
        var minutes = Math.floor(countdownTime / 60);
        var seconds = countdownTime % 60;

        // Display the remaining time in the countdown timer
        document.getElementById('countdown').innerHTML = minutes + "m:" + (seconds < 10 ? "0" : "") + seconds + "s";

        // Decrease the countdown time by one second
        countdownTime--;

        // If the countdown timer has reached zero, clear the interval and display a message
        if (countdownTime < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "Time's up!";
        }
    }, 1000);

}
showCountDown()

let candidateId = ""


//make a post call to localhost:3000/userStarted
function submitUser() {
    let name = document.getElementById("nameInput").value
    let email = document.getElementById("emailInput").value

    let userObj = {
        name: name,
        email: email
    }

    fetch("http://localhost:8080/userStarted", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        candidateId = data.candidateId
    })
}


//make a post call to localhost:3000/userSubmit send editor value
function submitCode() {

    if (codeSubmittedFlag)
        return
    else
        codeSubmittedFlag = true

    let code = encode(editor.getValue())

    // count number of test cases passed and failed
    let result = {
        passed: 0,
        failed: 0
    }

    testCasesObjAr.forEach((testCaseObj, index) => {
        if (testCaseObj.result == "✅")
            result.passed++
        else
            result.failed++
    })

    let userObj = {
        candidateId: candidateId,
        code: code,
        result: result
    }

    fetch("http://localhost:8080/userSubmit", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    })
}
