$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', phillies.startGame);
    $(document).on('click' , '.option', phillies.guessChecker);
    
  })
  
  var phillies = {
    unanswered: 0,
    currentSet: 0,
    correct: 0,
    incorrect: 0,
    timer: 20,
    timerOn: true,
    timerId : '',
    
    questions: {
      q1: 'Who is the Phillies alltime homerun leader?',
      q2: 'Who is the Phillies alltime leader in wins?',
      q3: 'All time plate apperances leader?',
      q4: 'How many championships do the Phillies have?',
      q5: "Who has the most wins for a Phillies manager?",
      q6: 'Who has the most stolen bases in Phillies history?',
      
    },
    answers: {
      q1: 'Mike Schmidt',
      q2: 'Steve Carlton',
      q3: 'Mike Schmidt',
      q4: '2',
      q5: 'Charlie Manuel',
      q6: 'Billy Hamilton',
  
    },
    options: {
      q1: ['Ryan Howard', 'Mike Schmidt', 'Jim Thome', 'Chase Utley'],
      q2: ['Steve Carlton', 'Cole Hamels', 'Cliff Lee', 'Pete Rose'],
      q3: ['Pat Burrell', 'Jimmy Rollins', 'Chase Utley', 'Mike Schmidt'],
      q4: ['3', '1', '5', '2'],
      q5: ['Charlie Manuel','Gene Mauch','Sparky Anderson','Pete Rose'],
      q6: ['Billy Hamilton','Chase Utley','Pat Burrell','Jimmy Rollins'],
      
    },
    
  
    startGame: function(){
      phillies.currentSet = 0;
      phillies.correct = 0;
      phillies.incorrect = 0;
      phillies.unanswered = 0;
      clearInterval(phillies.timerId);
    
      $('#game').show();
      $('#results').html('');
      $('#timer').text(phillies.timer);
      $('#start').hide();
      $('#remaining-time').show();
      phillies.nextQuestion();
      
    },
  
    nextQuestion : function(){
    
      phillies.timer = 10;

      $('#timer').text(phillies.timer);
      
      if(phillies.timerOn){
        phillies.timerId = setInterval(phillies.timerRunning, 1000);
      }
      var questionContent = Object.values(phillies.questions)[phillies.currentSet];
        $('#question').text(questionContent);
      var questionOptions = Object.values(phillies.options)[phillies.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-danger btn-lg">'+key+'</button>'));
      })
      
    },

    guessChecker : function() {
      var resultId
      var currentAnswer = Object.values(phillies.answers)[phillies.currentSet];
      
      if($(this).text() === currentAnswer){
  
        $(this).addClass('btn-success').removeClass('btn-danger');
          phillies.correct++;
        clearInterval(phillies.timerId);
          resultId = setTimeout(phillies.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
    
        $(this).addClass('btn-info').removeClass('btn-danger');
        phillies.incorrect++;
        clearInterval(phillies.timerId);
        resultId = setTimeout(phillies.guessResult, 1000);
        $('#results').html('<h3>'+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      phillies.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      phillies.nextQuestion();
       
    },

    timerRunning : function(){
    
      if(phillies.timer > -1 && phillies.currentSet < Object.keys(phillies.questions).length){
          $('#timer').text(phillies.timer);
        phillies.timer--;
      }
      else if(phillies.timer === -1){
          phillies.unanswered++;
          phillies.result = false;
        clearInterval(phillies.timerId);
        resultId = setTimeout(phillies.guessResult, 1000);
        $('#results').html('<h3>Out of time. The answer was '+ Object.values(phillies.answers)[phillies.currentSet] +'</h3>');
      }
      
      else if(phillies.currentSet === Object.keys(phillies.questions).length){
          $('#results')
          .html('<h3>Thank you for playing</h3>'+
          '<p>Correct: '+ phillies.correct +'</p>'+
          '<p>Incorrect: '+ phillies.incorrect +'</p>'+
          '<p>Unaswered: '+ phillies.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
       
        $('#game').hide();
        $('#start').show();
      }
      
    },
 
    
  
  }