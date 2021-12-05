// XP Calculations
document.getElementsByClassName("submit")[0].onclick = function () {
  document.getElementsByClassName("container")[0].style.display = "none";
  document.getElementById("results").style.display = "block";
  displayInfo();
};

document.getElementById("reset").onclick = function () {
  document.getElementsByClassName("container")[0].style.display = "block";
  document.getElementById("results").style.display = "none";
};

function calculateXP() {
  alert("Calculating...");
  /* Variables */
  // User inputs
  var currentXP = document.getElementById("current-xp").value;
  var desiredLVL = document.getElementById("level").value;
  var dateJoined = document.getElementById("time-join").value;

  // Calculator variables
  var totalXPToLVL = 0;
  var XPUntilLVL = 0;
  var currentDate = new Date();
  var totalSecondsJoined = 0;
  var avgXPGain = 0;
  var secondsToLVL = 0;
  var hoursToLVL = 0;
  var dateToLVL = new Date();
  var lowMessages = 0;
  var highMessages = 0;
  var meanMessages = 0;

  /* Calculator Program */
  // Sets the date joined to the epoch value
  dateJoined = Date.parse(dateJoined);
  // Uses the xpForLVL function to find the total XP to get to the desired LVL
  totalXPToLVL = xpForLVL(desiredLVL);
  // Sets XPUntilLVL as the difference between the total XP to the desired LVL minus the current XP inputted
  XPUntilLVL = totalXPToLVL - currentXP;
  // Sets the current date to the epoch value
  currentDate = Date.parse(currentDate);
  // Sets the total seconds joined in the server to the difference of the current date and the date joined, divided by 1000 to convert to seconds
  totalSecondsJoined = (currentDate - dateJoined) / 1000;
  // Sets the average XP gained per second as the current XP divided by the total seconds since joined
  avgXPGain = currentXP / totalSecondsJoined;
  // Sets the estimated seconds until the desired LVL is reached as the dividend of the XP until the desired LVL and the average XP gained per second
  secondsToLVL = XPUntilLVL / avgXPGain;
  // Sets the estimated hours until the desired LVL is reached
  hoursToLVL = secondsToLVL / 60 / 60;
  // Sets the date until the LVL is reached
  dateToLVL = dateToLVL.setTime(currentDate + secondsToLVL);
  // Sets the absolute minimum amount of messages required to reach the desired level
  lowMessages = Math.ceil(XPUntilLVL / 15);
  // Sets the absolute maxiumum amount of messages required to reach the desired level
  highMessages = Math.ceil(XPUntilLVL / 7);
  // Sets the mean amount of messages required to reach the desired level
  meanMessages = Math.ceil((lowMessages + highMessages) / 2);

  if (meanMessages < 0) {
    meanMessages = 0;
  }
  if (XPUntilLVL < 0) {
    XPUntilLVL = 0;
  }

  return [
    dateJoined, // Date joined
    currentDate, // Current date
    XPUntilLVL, // XP until level
    desiredLVL, // Desired level
    meanMessages, // Mean messages
    dateToLVL, // Date until level
  ];
}

// Calculates the amount of XP needed to get to any desired level
function xpForLVL(level) {
  var totalXP = 0;
  var LCV = 0;

  // Runs the while loop as long as LCV is less than level, but runs the loop at least 1 time (to ensure that level 1 is 100 xp)
  do {
    totalXP = totalXP + (5 * (LCV * LCV) + 50 * LCV + 100);
    LCV++;
  } while (LCV < level);

  // Sets the totalXP to 0 if level is equal to 0
  if ((level = 0)) {
    totalXP = 0;
  }

  // Returns totalXP
  return totalXP;
}

function displayInfo() {
  var info = calculateXP();
  document.getElementsByClassName("container")[0].style.display = "none";
  document.getElementById("results").style.display = "block";
  info[0] = new Date(info[0]);
  info[1] = new Date(info[1]);
  info[5] = new Date(info[5]);
  document.getElementById("date-join").innerHTML =
    "You Joined on " + info[0].toLocaleString();
  document.getElementById("current-date").innerHTML =
    "Today is " + info[1].toLocaleString();
  document.getElementById("xp-until-lvl").innerHTML =
    "You need " + info[2] + " xp until level " + info[3];
  document.getElementById("mean-messages").innerHTML =
    "That is around " + info[4] + " messages";
  document.getElementById("date-until-lvl").innerHTML =
    "You should reach that level on " + info[5].toLocaleString();
}
