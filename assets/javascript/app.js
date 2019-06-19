$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    unanswered: 0,
    currentSet: 0,
    correct: 0,
    incorrect: 0,
    timer: 20,
    timerOn: false,
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
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
    
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      trivia.nextQuestion();
      
    },
  
    nextQuestion : function(){
    
      trivia.timer = 10;

      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-danger btn-lg">'+key+'</button>'));
      })
      
    },

    guessChecker : function() {
      var resultId;
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
  
        $(this).addClass('btn-success').removeClass('btn-danger');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
    
        $(this).addClass('btn-info').removeClass('btn-danger');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
       
    },

    timerRunning : function(){
    
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
       
        $('#game').hide();
        $('#start').show();
      }
      
    },
 
    
  
  }