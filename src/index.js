import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const quizes = [
  {
    question: "What does the 'push' array method do?",
    options: [
      "Add element(s) to the beginning of an array", 
      "Remove an element from the beginning of an array", 
      "Add element(s) to the back of an array", 
      "Remove element from the back of an array"
    ],
    answer: "Add element(s) to the back of an array"
  },
  {
    question: "All of these Higher Order Array Methods returns an output except?",
    options: ["Array.map", "Array.forEach", "Array.filter", "Array.reduce"],
    answer: "Array.forEach"
  },
  {
    question: "Which of the following is not a builtin Javascript object?",
    options: ["Date", "Array", "Time", "Math"],
    answer: "Time"
  },
  {
    question: "What command skips the rest of a case statement?",
    options: ["break", "continue", "stop", "exit"],
    answer: "break"
  },
  {
    question: "What is correct about a method?",
    options: ["A method is the object oriented version of a function", 
              "A method is the object oriented version of a variable", 
              "A method is the object oriented version of a sequence", 
              "A method is the object oriented version ofa program"
            ],
    answer: "A method is the object oriented version of a function"
  },
  {
    question: "Which of the following is not a mouse event ?",
    options: ["onmouseover", "onmousemove", "onmouseout", "onmousescroll"],
    answer: "onmousescroll"
  },
  {
    question: "Which array method mutate the original array?",
    options: ["Array.slice", "Array.splice", "Array.reduce", "Array.some"],
    answer: "Array.splice"
  },
  {
    question: "Which event tests if a form field has changed? ?",
    options: ["onchange", "onmousedown", "onsubmit", "onkeydown"],
    answer: "onchange"
  },
  {
    question: "How would you access the second element in an array?",
    options: ["element.2", "element[2]", "element[1]", "element(1)"],
    answer: "element[1]"
  },
  {
    question: "Which of these 'for loops' would iterate through each item of the element array(no more, no less)?",
    options: ["for (var i = 0; i < element; i++) { }", 
              "for (var i = 1; i < element.length; i++) { }", 
              "for (var i = 1; i < nums; i++) { }", 
              "for (var i = 0; i <= nums.length-1; i++) { }"
            ],
    answer: "for (var i = 0; i <= nums.length-1; i++) { }"
  }
]

const Questions = props => {
  const style = {
    paddingRight: 20,
  }
  return <h3 className = "question"><span style = {style} >( {props.num} )</span> {props.ques}</h3>
}

Questions.propTypes = {
  num: PropTypes.number.isRequired,
  ques: PropTypes.string.isRequired
}

const Buttons = props => {
  const btnStyle = {
    display: "block",
    width: 300,
    padding: "15px 10px",
    border: "1px solid #000",
    borderBottom: "2px solid #000",
    cursor: "pointer"
  }

  return <button className = "optionsBtn" style = {btnStyle} onClick = {()=> props.handleClick(props.value)}> {props.value} </button>
}

Buttons.propTypes = {
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

const Options = props => {
  const mapOptions = props.quesOptions.map((option, index) => {
    return <Buttons key = {index} 
                    value = {option}
                    handleClick = {props.handleOptionButtons}
          />
  })

  return <div> {mapOptions} </div>
}

Options.propTypes = {
  quesOptions: PropTypes.array.isRequired,
  handleOptionButtons: PropTypes.func.isRequired
}


class RenderQuizes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
      incorrect: 0,
      currentQuestion: 0,
      completed: false
    }
    this.handleOptionButtons = this.handleOptionButtons.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
  }

  handleOptionButtons(val) {
    if(quizes[this.state.currentQuestion].answer === val) {
      //Need to Work on this
      if(quizes[this.state.currentQuestion] === quizes[0]) {
        this.displayAlert("That's a good start", "success");
      } else {
        //this.displayAlert("Keep the fire Burning", "success")
        this.displayRandomSuccessAlert();
      }
      this.setState({correct: ++this.state.correct})
    } else if (quizes[this.state.currentQuestion].answer !== val) {
      if(quizes[this.state.currentQuestion] === quizes[0]) {
        //console.log("Not a good way to start but I believe in you");
        this.displayAlert("Not an ideal way to start but it's OKAY", "danger");
      } else {
        this.displayRandomFailureAlert();
      }
      this.setState({incorrect: ++this.state.incorrect})
    }
    if(quizes.length-1 !== this.state.currentQuestion) {
      this.setState({currentQuestion: ++this.state.currentQuestion});
    } else {
      this.setState({completed: true});
    }

    setTimeout(()=> this.removeAlert(), 3000);
  }

  restartQuiz() {
    this.setState({
      correct: 0,
      incorrect: 0,
      currentQuestion: 0,
      completed: false
    })
  }

  displayAlert(message, className) {
    this.removeAlert()
    const div = document.createElement('div');
    div.className += `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.getElementById('container');
    const question = document.querySelector('.question');
    container.insertBefore(div, question);
  }

  removeAlert() {
    let currentAlert = document.querySelector('.alert');
      if(currentAlert) {
        currentAlert.remove();
      }
  }

  displayRandomSuccessAlert() {
    const randomText = [
      "You're Unstoppable",
      "Keep up the momentum",
      "You're such a genius",
      "You should really be proud of yourself",
      "Your expertise is greater than you think"
    ]
    const randomIndex = Math.floor(Math.random() * randomText.length);
    return this.displayAlert(randomText[randomIndex], "success");
  }

  displayRandomFailureAlert() {
    const randomText = [
      "Failure begets success. Keep going",
      "Failure fuels discouragement. Don't give up",
      "It's normal to not get it right. Keep trying",
      "I absolutely have a firm belief in YOU.",
      "You can do much better",
      "Keep pushing. You'd eventually get it right",
      "Have a winning mentality. You'll get there"
    ]
    const randomIndex = Math.floor(Math.random() * randomText.length);
    return this.displayAlert(randomText[randomIndex], "danger");
  }

  render() {
    const styleParentDiv = {
      display: "flex",
      justifyContent: "space-around"
    }

    if(!this.state.completed) {
      return (
        <div id = "container">
          <Questions num = {this.state.currentQuestion + 1} ques = {quizes[this.state.currentQuestion].question} />
          <div style = {styleParentDiv}>
            <div class = "left-element">
              <Options handleOptionButtons = {this.handleOptionButtons} quesOptions = {quizes[this.state.currentQuestion].options} />
            </div>
            <div>
              <h3><span style = {{color: "green"}} >Correct</span>: {this.state.correct} </h3>
              <h3><span style = {{color: "red"}} >Incorrect</span>: {this.state.incorrect} </h3>
              <h3><span style = {{color: "purple"}} >Remaining Questions</span>:  { quizes.length-1 - this.state.currentQuestion } </h3>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div style = {{textAlign: "center"}}>
          <h3> You score is: <span style = {{color: "green"}}>{this.state.correct}</span> / <span style = {{color: "purple"}} >{quizes.length}</span> </h3>
          <h4> Would you like to try again? </h4>
          <button class="restart-btn" onClick = {this.restartQuiz} >Restart</button>
        </div>

      )
    }
  }
}

ReactDOM.render(<RenderQuizes />, document.getElementById('root'));