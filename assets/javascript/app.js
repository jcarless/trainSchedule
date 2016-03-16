
var scheduleData = new Firebase('https://trainscheduleapp.firebaseio.com/');

var trains = 0;


$(function(){
    $('#t1').clockface();  
});


var getMomentFromTimeString = function(x,y) {


//   var t = moment(x, 'HH:mm');
//   var mmFirstTime = (t.hours() * 60) + (t.minutes());
//   var timeNow = moment();
//   var mmTimeNow = (timeNow.hours() * 60) + (timeNow.minutes());
//   console.log(mmTimeNow +' vs '+ mmFirstTime);


//   var diff = mmTimeNow - mmFirstTime;

// console.log('difference: '+diff);

// 	console.log('difference/frequency: '+diff / y);
// 	console.log('remainder: '+ diff % y );
// 	var remainder = diff % y;
// 	console.log('next train');
// console.log(y - remainder);
// var nextTrain = y - remainder;
// console.log(y+' - '+remainder);

  // return t;


};


$('#submit').on('click', function(){
trains++;

	// convert to military time
	var time = $("#t1").val();
var hours = Number(time.match(/^(\d+)/)[1]);
var minutes = Number(time.match(/:(\d+)/)[1]);
var AMPM = time.match(/\s(.*)$/)[1];
if(AMPM == "PM" && hours<12) hours = hours+12;
if(AMPM == "AM" && hours==12) hours = hours-12;
var sHours = hours.toString();
var sMinutes = minutes.toString();
if(hours<10) sHours = "0" + sHours;
if(minutes<10) sMinutes = "0" + sMinutes;

	// alert(sHours + ":" + sMinutes);

	var newTrainName = $('#trainName').val().trim();

	var newTrainDestination = $('#destination').val().trim();

	var newTrainFirstDeparture = sHours + sMinutes;

	var newTrainFrequency = $('#frequency').val().trim();

// console.log(newTrainName);
// console.log(newTrainDestination);
// console.log(newTrainFirstDeparture);
// console.log(newTrainFrequency);

	getMomentFromTimeString(newTrainFirstDeparture, newTrainFrequency);



	var newTrain = {
		train:  newTrainName,
		destination: newTrainDestination,
		firstDeparture: newTrainFirstDeparture,
		frequency: newTrainFrequency
	};

	scheduleData.push(newTrain);

	$('#trainName').val('');
	$('#destination').val('');
	$('#frequency').val('');




	
// 	console.log(
// moment(sHours+sMinutes, "HHMM").fromNow()
// 		);



	
	return false;
});

scheduleData.on('child_added', function(snapshot, prevChildKey){
	var newPost = snapshot.val();
	// console.log(newPost);

	var trainName = snapshot.val().train;
	var trainDestination = snapshot.val().destination;
	var trainFirstDeparture = snapshot.val().firstDeparture;
	var trainFrequency = snapshot.val().frequency;


	var t = moment(trainFirstDeparture, 'HH:mm');
	var mmFirstTime = (t.hours() * 60) + (t.minutes());
	var timeNow = moment();
	var mmTimeNow = (timeNow.hours() * 60) + (timeNow.minutes());
	// console.log(mmTimeNow +' vs '+ mmFirstTime);


  var diff = mmTimeNow - mmFirstTime;

// console.log('difference: '+diff);
// console.log('----------------------')
// 	console.log('difference/frequency: '+diff / trainFrequency);
// 	console.log('remainder: '+ diff % trainFrequency );
	var remainder = diff % trainFrequency;
// 	console.log('next train');
// console.log(trainFrequency - remainder);
var minsAway = trainFrequency - remainder;

// function run(){
//       counter = setInterval(increment, 1000);
//     }
//     function increment(){
//       var minsAway = trainFrequency - remainder;
//       }
    

    // run();

var nextTrain = minsAway + mmTimeNow;

	// console.log('next train / 60 whole number');
	// console.log(Math.floor(nextTrain/60));
	var hours = Math.floor(nextTrain/60);

	// console.log('remainder');
	// console.log(nextTrain % 60);
	var minutes = nextTrain % 60;

	// console.log((nextTrain % 60) + (nextTrain / 60));

	var nextTrainM = hours+''+minutes;
	var nextTrainAMPM = moment(nextTrainM, 'HH:mm').format('hh:mm A');
	// console.log(nextTrainAMPM);

	// console.log(hours+''+minutes);
	// console.log(nextTrainM);

	for (var i = 0; i <= trains; i++ ) {
		
	};

	



	$('tbody').prepend("<tr>"+
						"<td>"+trainName+"</td>"+
						"<td>"+trainDestination+"</td>"+
						"<td>"+trainFrequency+"</td>"+
						"<td>"+nextTrainAMPM+"</td>"+
						"<td>"+minsAway+"</td>"+
					"</tr>");
});


