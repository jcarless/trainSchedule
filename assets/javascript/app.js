
var scheduleData = new Firebase('https://trainscheduleapp.firebaseio.com/');



$(function(){
    $('#t1').clockface();  
});

$('#submit').on('click', function(){
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

	var newTrainFirstDeparture = sHours+sMinutes;

	var newTrainFrequency = $('#frequency').val().trim();

// console.log(newTrainName);
// console.log(newTrainDestination);
// console.log(newTrainFirstDeparture);
// console.log(newTrainFrequency);




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
	console.log(newPost);

	var trainName = snapshot.val().train;
	var trainDestination = snapshot.val().destination;
	var trainFirstDeparture = snapshot.val().firstDeparture;
	var trainFrequency = snapshot.val().frequency;

	// console.log(trainName);
	// console.log(trainDestination);
	// console.log(trainFirstDeparture);
	// console.log(trainFrequency);
	
	$('.table').append("<tr>"+
						"<td>"+trainName+"</td>"+
						"<td>"+trainDestination+"</td>"+
						"<td>"+trainFrequency+"</td>"+
						"<td>"+'1pm'+"</td>"+
						"<td>"+'30mins'+"</td>"+
					"</tr>");
});


