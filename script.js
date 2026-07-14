// =====================================
// CycleEase - script.js (Part 1)
// =====================================

// Pain Slider
const painSlider = document.getElementById("painSlider");
const painValue = document.getElementById("painValue");

const foodRecommendation = document.getElementById("foodRecommendation");
const tips = document.getElementById("tips");

painSlider.addEventListener("input", function () {

    let pain = parseInt(painSlider.value);

    painValue.innerHTML = pain;

    if (pain <= 2) {

        foodRecommendation.innerHTML =
            "<h3>🥗 Recommended Foods</h3>" +
            "<ul>" +
            "<li>🍌 Banana</li>" +
            "<li>🥛 Yogurt</li>" +
            "<li>💧 Drink more Water</li>" +
            "</ul>";

        tips.innerHTML =
            "<h3>❤️ Self Care</h3>" +
            "<ul>" +
            "<li>Take a short walk</li>" +
            "<li>Stay hydrated</li>" +
            "<li>Get enough sleep</li>" +
            "</ul>";

    }

    else if (pain <= 5) {

        foodRecommendation.innerHTML =
            "<h3>🥗 Recommended Foods</h3>" +
            "<ul>" +
            "<li>🥬 Spinach</li>" +
            "<li>🍊 Orange</li>" +
            "<li>🍫 Dark Chocolate</li>" +
            "<li>🥜 Nuts</li>" +
            "</ul>";

        tips.innerHTML =
            "<h3>❤️ Self Care</h3>" +
            "<ul>" +
            "<li>Use a heating pad</li>" +
            "<li>Do light yoga</li>" +
            "<li>Drink warm water</li>" +
            "</ul>";

    }

    else {

        foodRecommendation.innerHTML =
            "<h3>🥗 Recommended Foods</h3>" +
            "<ul>" +
            "<li>🥣 Warm Soup</li>" +
            "<li>🍵 Ginger Tea</li>" +
            "<li>🥬 Leafy Vegetables</li>" +
            "<li>🥩 Iron Rich Foods</li>" +
            "</ul>";

        tips.innerHTML =
            "<h3>❤️ Self Care</h3>" +
            "<ul>" +
            "<li>Take proper rest</li>" +
            "<li>Apply heat pack</li>" +
            "<li>Consult a doctor if pain is severe</li>" +
            "</ul>";

    }

});

// =====================================
// Predict Next Period
// =====================================

function predictPeriod() {

    let lastDate = document.getElementById("lastPeriod").value;

    let cycleLength = parseInt(document.getElementById("cycleLength").value);

    if (lastDate == "") {

        alert("Please Select Last Period Date");

        return;

    }

    let date = new Date(lastDate);

    date.setDate(date.getDate() + cycleLength);

    document.getElementById("prediction").innerHTML =
        "📅 Next Expected Period : <br><br><b>" +
        date.toDateString() +
        "</b>";

}
// =====================================
// CycleEase - script.js (Part 2)
// Save Data & History
// =====================================

function saveData() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let lastPeriod = document.getElementById("lastPeriod").value;
    let cycleLength = document.getElementById("cycleLength").value;
    let pain = document.getElementById("painSlider").value;
    let mood = document.getElementById("mood").value;
    let flow = document.getElementById("flow").value;
    let water = document.getElementById("water").value;

    // Get Symptoms

    let symptoms = [];

    document.querySelectorAll(".checkbox input:checked").forEach(function(item){

        symptoms.push(item.value);

    });

    let record = {

        name:name,
        age:age,
        lastPeriod:lastPeriod,
        cycleLength:cycleLength,
        pain:pain,
        mood:mood,
        flow:flow,
        water:water,
        symptoms:symptoms,
        date:new Date().toLocaleDateString()

    };

    let records = JSON.parse(localStorage.getItem("cycleEase")) || [];

    records.push(record);

    localStorage.setItem("cycleEase",JSON.stringify(records));

    alert("✅ Record Saved Successfully!");

    displayHistory();

}

// =====================================
// Display History
// =====================================

function displayHistory(){

    let history = document.getElementById("history");

    let records = JSON.parse(localStorage.getItem("cycleEase")) || [];

    if(records.length==0){

        history.innerHTML="<p>No Records Found</p>";

        return;

    }

    history.innerHTML="";

    records.reverse().forEach(function(record){

        history.innerHTML += `

        <div class="history-card">

            <h4>${record.date}</h4>

            <p><strong>Name:</strong> ${record.name}</p>

            <p><strong>Age:</strong> ${record.age}</p>

            <p><strong>Pain Level:</strong> ${record.pain}</p>

            <p><strong>Mood:</strong> ${record.mood}</p>

            <p><strong>Flow:</strong> ${record.flow}</p>

            <p><strong>Water:</strong> ${record.water} Glasses</p>

            <p><strong>Symptoms:</strong> ${record.symptoms.join(", ")}</p>

        </div>

        `;

    });

}

// =====================================
// Load History Automatically
// =====================================

window.onload=function(){

    displayHistory();

};
// =====================================
// CycleEase - script.js (Part 3)
// Final Part
// =====================================

// -------------------------------
// Water Progress
// -------------------------------

function updateWaterProgress(){

    let water = parseInt(document.getElementById("water").value);

    if(isNaN(water)){
        water = 0;
    }

    let progress = document.getElementById("waterProgress");

    if(progress){

        let percentage = (water / 8) * 100;

        if(percentage > 100){
            percentage = 100;
        }

        progress.style.width = percentage + "%";
        progress.innerHTML = water + "/8 Glasses";

    }

}

// -------------------------------
// Dark Mode
// -------------------------------

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

}

// -------------------------------
// Clear History
// -------------------------------

function clearHistory(){

    if(confirm("Are you sure you want to delete all records?")){

        localStorage.removeItem("cycleEase");

        displayHistory();

        alert("History Cleared Successfully.");

    }

}

// -------------------------------
// Wellness Score
// -------------------------------

function calculateScore(){

    let pain = parseInt(document.getElementById("painSlider").value);

    let water = parseInt(document.getElementById("water").value);

    if(isNaN(water)){
        water = 0;
    }

    let score = 100;

    score -= pain * 6;

    score += water * 2;

    if(score > 100){
        score = 100;
    }

    if(score < 0){
        score = 0;
    }

    let scoreBox = document.getElementById("wellnessScore");

    if(scoreBox){

        scoreBox.innerHTML =
        "<h3>🌸 Wellness Score</h3><h2>" +
        score +
        "%</h2>";

    }

}

// -------------------------------
// Auto Update
// -------------------------------

document.getElementById("water").addEventListener("input",function(){

    updateWaterProgress();

    calculateScore();

});

document.getElementById("painSlider").addEventListener("input",function(){

    calculateScore();

});

// -------------------------------
// Welcome Message
// -------------------------------

window.addEventListener("load",function(){

    console.log("CycleEase Loaded Successfully");

    updateWaterProgress();

    calculateScore();

});

// -------------------------------
// Daily Quote
// -------------------------------

const quotes=[

"🌸 Stay Strong. Better Days are Coming.",

"💖 Take Care of Yourself Today.",

"🌼 Rest is also Productive.",

"💕 Hydration is Self Care.",

"🌷 Every Cycle is Different. Listen to Your Body."

];

function showQuote(){

    let random=Math.floor(Math.random()*quotes.length);

    let quoteBox=document.getElementById("dailyQuote");

    if(quoteBox){

        quoteBox.innerHTML=quotes[random];

    }

}

showQuote();
