API_KEY = "e81b1c7bf8mshcb853477b02ef3ap1e5a73jsn45c6c7f5cdcb"
//"3a741d4f13msh46af1ea44bc1bdcp1bf020jsnf18723627030";

console.log("hello world")

console.log(questionsData)
//import json from questions.json
let questionObj = questionsData[0]
console.log(questionObj)
let question = questionObj.question

//iterate questionObj.testcasesList and create testCasesObjAr
let testCasesObjAr = []

for(let i=0; i<questionObj.testcasesList.length; i++){
    testCasesObjAr.push({
        input: questionObj.testcasesList[i].input,
        expectedOutput: questionObj.testcasesList[i].output,
        output: "-",
        token: "",
        result: "Pending"
    })
}

console.log(testCasesObjAr)



// let testCasesObjAr = [
//     {
//         input: ['abc', 'cdb', 'fgv'],
//         expectedOutput: JSON.parse(JSON.stringify("['abc', 'cdb', 'fgv']\n")).trim(),
//         output: "-",
//         token: "",
//         result: "Pending"
//     }]
    // {
    //     input: "mango",
    //     expectedOutput: "mango",
    //     output: "-",
    //     token: "",
    //     result: "Pending"
    // },
    // {
    //     input: 11,
    //     expectedOutput: 11,
    //     output: "-",
    //     token: "",
    //     result: "Pending"
    // }, {
    //     input: [11, 12, 13],
    //     expectedOutput: JSON.stringify([11, 12, 13]),
    //     output: "-",
    //     token: "",
    //     result: "Pending"
    // }, {
    //     input: [],
    //     expectedOutput: JSON.stringify([]),
    //     output: "-",
    //     token: "",
    //     result: "Pending"
    // }, {
    //     input: 1.2324,
    //     expectedOutput: 1.2324,
    //     output: "-",
    //     token: "",
    //     result: "Pending"
    // }, {
    //     input: 'a',
    //     expectedOutput: 'a',
    //     output: "-",
    //     token: "",
    //     result: "Pending"
    // }, 
   

//console.log(testCasesObjAr[2].input[2])

let currentSelectedLang = "JavaScript"
let fnctionName = "testFunction"
let argsName = "nums"


//add question to questionDiv
document.getElementById("questionDiv").innerText = question

//add event listener to language dropdown
document.getElementById("lang").addEventListener("change", function () {
    console.log(this.value)
    currentSelectedLang = this.value
    updateSourceCodeArea(this.value)
})


function updateSourceCodeArea(lang) {
    if (lang == "JavaScript") {
        document.getElementById("source").value =
            `function ${fnctionName}(${argsName})\n{\n\t\n}`
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
    "JavaScript": 63
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

function errorHandler(jqXHR, textStatus, errorThrown) {
    $("#output").val(`${JSON.stringify(jqXHR, null, 4)}`);
    $("#run").prop("disabled", false);
}





function check(token) {
    $("#output").val($("#output").val() + "\n⏬ Checking status for..." + token);


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
                console.log("error caught") 

                stdOut = (response.stdout).trim().toString().trim()
            }



            if (response.status_id == 3) {
                document.getElementById("output").value = `output:\n ${stdOut}`;

                testCasesObjAr.forEach(testCaseObj => {
                    if (testCaseObj.token == token) {
                        testCaseObj.output = stdOut;
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

                document.getElementById("output").value = `output:\n ${status.description}`;
            }
            else {
                testCasesObjAr.forEach(testCaseObj => {
                    if (testCaseObj.token == token)
                        testCaseObj.output = "Error";
                })

                document.getElementById("output").value = `output:\n ${response.stderr}`;
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


    $("#output").val($("#output").val() + "\n⏬ Checking status for..." + tokenStr);


    //convert above code to fetch
    fetch(`https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${tokenStr}?base64_encoded=false&fields=stdout,stderr,status_id,language_id`, {
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

                //testCaseObj.output = JSON.stringify(JSON.parse(response.stdout));


                if (response[i].status_id == 3) {
                    document.getElementById("output").value = `output:\n ${stdOut}`;

                    testCasesObjAr.forEach(testCaseObj => {
                        if (testCaseObj.token == token) {
                            testCaseObj.output = stdOut;
                        }
                    })

                }
                else if (response[i].status_id == 1 || response[i].status_id == 2) {
                    setTimeout(function () { check(token) }, 2000);
                    testCasesObjAr.forEach(testCaseObj => {
                        if (testCaseObj.token == token)
                            testCaseObj.output = status.description;
                    })
                }
                else if (response[i].status_id != null) {
                    testCasesObjAr.forEach(testCaseObj => {
                        if (testCaseObj.token == token)
                            testCaseObj.output = status.description;
                    })

                    document.getElementById("output").value = `output:\n ${status.description}`;
                }
                else {
                    testCasesObjAr.forEach(testCaseObj => {
                        if (testCaseObj.token == token)
                            testCaseObj.output = "Error";
                    })

                    document.getElementById("output").value = `output:\n ${response[i].stderr}`;
                }
            }
            addTestCasesTable()


        })
        .catch(err => {

            console.error(err);

        });
}

function run(testObj) {

    $("#run").prop("disabled", true);
    $("#output").val("⚙️ Creating submission...");


    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-host", " judge0-ce.p.rapidapi.com");
    myHeaders.append("x-rapidapi-key", API_KEY);
    myHeaders.append("Content-Type", "application/json");

    let inputAr = testObj.input;


    var raw = {
        submissions: [{
            "language_id": language_to_id[document.getElementById("lang").value],
            "source_code": encode(document.getElementById("source").value + `\n console.log(testFunction(JSON.parse(\'${JSON.stringify(inputAr)}')))`),
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

function runBatched() {

    $("#run").prop("disabled", true);
    $("#output").val("⚙️ Creating submission...");


    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-host", " judge0-ce.p.rapidapi.com");
    myHeaders.append("x-rapidapi-key", API_KEY);
    myHeaders.append("Content-Type", "application/json");



    var raw = {
        submissions: []
    }

    testCasesObjAr.forEach(testObj => {
        raw.submissions.push({
            "language_id": language_to_id[document.getElementById("lang").value],
            "source_code": encode(document.getElementById("source").value + `\n console.log(${fnctionName}(JSON.parse(\'${JSON.stringify(testObj.input)}')))`),
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

            document.getElementById("output").value += "\n🎉 Submission created."

        })
        .catch(error => console.log('error', error));





}


$("body").keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 13) {
        // for (var i = 0; i < testCasesObjAr.length; i++) {
         //   run(testCasesObjAr[6]);
        // }

         runBatched()


    }
});

$("textarea").keydown(function (e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var append = "    ";
        $(this).val($(this).val().substring(0, start) + append + $(this).val().substring(end));

        this.selectionStart = this.selectionEnd = start + append.length;
    }
});




function addTestCasesTable() {




    document.getElementById("testCaseDiv").innerHTML =
        `<table class="uk-table uk-table-hover  uk-table-striped" id="test-cases-table">
    <thead>
        <tr>
            <th>Input</th>
            <th>Expected</th>

            <th>Output</th>
            <th>Result</th>
        </tr>
    </thead>
    <tbody>
${testCasesObjAr.map((testCaseObj) => {


  //  console.log("Comparing: " + testCaseObj.expectedOutput + " with " + testCaseObj.output);

            if ((testCaseObj.expectedOutput) == (testCaseObj.output))
                testCaseObj.result = "✅"
            else if (testCaseObj.output == "-" || testCaseObj.output =="processing" || testCaseObj.output =="In Queue" || testCaseObj.output =="compiling" || testCaseObj.output =="running")
                testCaseObj.result = "Pending"
            else {
                //console.log((testCaseObj.expectedOutput))
                //console.log(testCaseObj.output)
                testCaseObj.result = "❌"
            }


            return `<tr>
    <td>${JSON.stringify(testCaseObj.input)}</td>
    <td>${testCaseObj.expectedOutput}</td>
    <td>${testCaseObj.output}</td>
    <td>${testCaseObj.result}</td>
</tr>`
        }).join('')
        }

</tbody>
</table>`


}

addTestCasesTable()