const introPage = document.querySelector('.intro-page');
const questionOnePage = document.querySelector('.question-one-page');
const questionTwoPage = document.querySelector('.question-two-page');
const questionThreePage = document.querySelector('.question-three-page');
const questionFourPage = document.querySelector('.question-four-page');
const progressLine = document.querySelectorAll('.progress-line');
let tempArray = [];
const questions = {
	type: "",
	time: "",
	category: "",
};


const changeProgressLine = function(val){
	progressLine.forEach((line)=> {
		line.style.width = val;
	})
}

document.addEventListener('click', function (event) {
	if (event.target.matches('.begin-btn')) {
		introPage.classList.remove('active');
        questionOnePage.classList.add('active');
	}
	if (event.target.matches('.question-one-btn')) {
		questionOnePage.classList.remove('active');
		questions.type = [event.target.textContent];
        questionTwoPage.classList.add('active');
		changeProgressLine('20%');
	}
	if (event.target.matches('.question-two-btn')) {
		questionTwoPage.classList.remove('active');
		questions.time = [event.target.textContent];
		questionThreePage.classList.add('active');
		changeProgressLine('35%');
	}
	if (event.target.matches('.question-three-btn')) {
		let flag = false;
		let category = event.target.textContent;
		const checkDuplicate = function (value, array) {
			for (let i = 0; i < tempArray.length; i++) {
				if (value === array[i]){
					const id = tempArray.indexOf(value);
					const removeId = tempArray.splice(id, 1);
					event.target.setAttribute('style', 'background: #fcf3f3 !important; color: #1D1919 !important;');
					flag = true;
				} 
			}
		}
		if (tempArray === undefined || tempArray.length == 0) {
			event.target.setAttribute('style', 'background: #6edb27; color: #ffffff;');
			tempArray.push(event.target.textContent);
		} 
		else {
			checkDuplicate(category, tempArray);
			if (flag == false){
				event.target.setAttribute('style', 'background: #6edb27; color: #ffffff;');
				tempArray.push(category);
			} 
		}
	}

	if (event.target.matches('.question-three-proceed-btn')) {
		questionThreePage.classList.remove('active');
		questionFourPage.classList.add('active');
		changeProgressLine('50%');
		questions.category = tempArray;
		console.log(questions);
	}

}, false);