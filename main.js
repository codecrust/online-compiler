API_KEY ="e81b1c7bf8mshcb853477b02ef3ap1e5a73jsn45c6c7f5cdcb"
// "3a741d4f13msh46af1ea44bc1bdcp1bf020jsnf18723627030"; // Get yours for free at https://judge0.com/ce or https://judge0.com/extra-ce

let question =
    `You have a list of numbers, and you want to find the two numbers in the list
        that add up to a given target value. Write a program in any programming language that takes in a list of numbers
        and a target value as input and outputs the indices of the two numbers in the list that add up to the target
        value. If no such pair exists, the program should output an error message or null.

        For example, if the input list is [2, 4, 7, 11, 15] and the target value is 9, the program should output [0, 2],
        since 2 + 7 = 9 and the indices of 2 and 7 in the list are 0 and 2, respectively.

        Good luck!`



let testCasesObjAr = [
    {
        input: "mango",
        expectedOutput: "mango",
        output: "1",
        result: "Pending"
    }, {
        input: 11,
        expectedOutput: 11,
        output: "1",
        result: "Pending"
    }, {
        input: [11, 12, 13],
        expectedOutput: [11, 12, 13],
        output: "1",
        result: "Pending"
    }]

    console.log(testCasesObjAr[2].input[2])

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



let statusIdObj = [{
    "id": 1,
    "description": "In Queue"
},
{
    "id": 2,
    "description": "Processing"
},
{
    "id": 3,
    "description": "Accepted"
},
{
    "id": 4,
    "description": "Wrong Answer"
},
{
    "id": 5,
    "description": "Time Limit Exceeded"
},
{
    "id": 6,
    "description": "Compilation Error"
},
{
    "id": 7,
    "description": "Runtime Error (SIGSEGV)"
},
{
    "id": 8,
    "description": "Runtime Error (SIGXFSZ)"
},
{
    "id": 9,
    "description": "Runtime Error (SIGFPE)"
},
{
    "id": 10,
    "description": "Runtime Error (SIGABRT)"
},
{
    "id": 11,
    "description": "Runtime Error (NZEC)"
},
{
    "id": 12,
    "description": "Runtime Error (Other)"
},
{
    "id": 13,
    "description": "Internal Error"
},
{
    "id": 14,
    "description": "Exec Format Error"
}]



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
            console.log(response.language_id)
            console.log(response.status_id)
            console.log(response.stdout)
            console.log(response.stderr)

            if (response.status_id == 3)
                document.getElementById("output").value = `output:\n ${response.stdout}`;
            else if (response.status_id == 1 || response.status_id == 2)
                setTimeout(function () { check(token) }, 2000);
            else if (response.status_id != null) {

                let status = statusIdObj.find(obj => obj.id == response.status_id)
                document.getElementById("output").value = `output:\n ${status.description}`;
            }
            else {
                document.getElementById("output").value = `output:\n ${response.stderr}`;
            }

        })
        .catch(err => {

            console.error(err);

        });
    //retry thrice




}


console.log(language_to_id[document.getElementById("lang").value])
console.log(encode(document.getElementById("source").value))

function run() {
    $("#run").prop("disabled", true);
    $("#output").val("⚙️ Creating submission...");


    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-host", " judge0-ce.p.rapidapi.com");
    myHeaders.append("x-rapidapi-key", API_KEY);
    myHeaders.append("Content-Type", "application/json");

    let inputAr = testCasesObjAr[0].input;


    var raw = {
        "language_id": language_to_id[document.getElementById("lang").value],
        "source_code": encode(document.getElementById("source").value + `\n console.log(testFunction(JSON.parse(\'${JSON.stringify(inputAr)}')))`),
        // \"stdin\": encode($(\"#input\").val()),\r\n    
        //  \"expected_output\": encodedExpectedOutput,\r\n   
        "redirect_stderr_to_stdout": true
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };

    fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false", requestOptions)
        .then(response => response.json())
        .then(data => {

            document.getElementById("output").value += "\n🎉 Submission created."
            setTimeout(function () { check(data["token"]) }, 2000)
            console.log(data)


        })
        .catch(error => console.log('error', error));




}

// write above code in fetch

//     fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false", {
//         "method": "POST",
//         "headers": {
//             "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//             "x-rapidapi-key": API_KEY
//         },
//         "body": {
//             "language_id": language_to_id[document.getElementById("lang").value],
//             "source_code": "Y29uc29sZS5sb2coImhlbGxvdyB3b3JsZCIpOwo=",
//            // "stdin": encode($("#input").val()),
//           //  "expected_output": encodedExpectedOutput,
//             "redirect_stderr_to_stdout": true
//         }


//     }
//     ).then(res => res.json())

//         .then(data => {
//             console.log(data);

//         })

//         .catch(err => {
//             console.error(err);
//         });
// }


$("body").keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 13) {
        run();
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
        `<table class="table table-bordered table-hover" id="test-cases-table">
    <thead>
        <tr>
            <th>Input</th>
            <th>Expected</th>
            <th>Output</th>
            <th>Result</th>
        </tr>
    </thead>
    <tbody>
${
testCasesObjAr.map((testCaseObj) => {
    return `<tr>
    <td>${testCaseObj.input}</td>
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