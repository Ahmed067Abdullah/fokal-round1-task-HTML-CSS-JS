const placeholders = {
  name: "Enter your name",
  email: "Enter your email address",
  message: "Your message here..."
};

const formSubmitted = () => {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  checkInput(name, "name");
  checkInput(email, "email");
  checkInput(message, "message");
  validateEmail(email);
};

const checkInput = (value, field) => {
  if (value.length <= 0) {
    document.querySelector(`.${field}-error`).classList.remove("hidden");
  } else {
    document.querySelector(`.${field}-error`).classList.add("hidden");
  }
};

const validateEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email))
    document.querySelector(`.email-error`).classList.remove("hidden");
};

const showErrorBox = field => {
  document.querySelector(`.${field}-error-text`).classList.remove("hidden");
  document
    .querySelector(`.${field}-error-container`)
    .classList.add("focused-container");
};

const hideErrorBox = field => {
  document.querySelector(`.${field}-error-text`).classList.add("hidden");
  document
    .querySelector(`.${field}-error-container`)
    .classList.remove("focused-container");
};

const focused = field => {
  var input = document.getElementById(field);
  document.querySelector(`.${field}-error`).classList.add("hidden");
  input.placeholder = "";
  input.parentNode.style.borderBottom = "2px solid #7f7f7f";
};

const unFocused = field => {
  var input = document.getElementById(field);
  input.placeholder = placeholders[field];
  input.parentNode.style.borderBottom = "2px solid #d9d9d9";
};

var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
      /*when an item is clicked, update the original select box,
            and the selected item:*/
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
    except the current select box:*/
  var x,y,i,arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
