/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// select the element with a class of `student-list` and assign it to a variable
const studentList = document.querySelector('.student-list');


// ==============================================================================

/*
The `showPage` function
This function creates and inserts/appends the elements needed to display a "page" of nine students
*/

function showPage(list, page) {

    // variables which represent the index for the first and last student on the page
    let startIndex = (page * 9) - 9;
    let endIndex = (page * 9) - 1;



    // set the innerHTML property of the variable above to an empty string
    studentList.innerHTML = '';

    // loop over the length of the `list` parameter
    for (let i = 0; i < list.length; i++) {

        // a conditional to display the proper students
        if (i >= startIndex && i <= endIndex) {

            // creates the elements needed to display the student information
            let studentItem = `
                <li class="student-item cf">
                    <div class="student-details">
                        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                        <h3>${list[i].name.first} ${list[i].name.last}</h3>
                        <span class="email">${list[i].email}</span>
                    </div>
                    <div class="joined-details">
                        <span class="date">Joined ${list[i].registered.date}</span>
                    </div>
                </li>
            `;

            // inserts the above elements
            studentList.insertAdjacentHTML("beforeend", studentItem);
        }
    };
}

// ==============================================================================

/*
the `addPagination` function
This function creates and inserts/appends the elements needed for the pagination buttons
*/

function addPagination(list) {

    // a variable to calculate the number of pages needed
    const numOfPages = Math.ceil(list.length / 9);

    // selects the element with a class of `link-list` and assigns it to a variable
    const linkList = document.querySelector('.link-list');

    // sets the innerHTML property of the variable above to an empty string
    linkList.innerHTML = '';

    // loops over the number of pages needed
    for (let i = 1; i <= numOfPages; i++) {

        // creates the elements needed to display the pagination button
        const button = `
            <li>
                <button type="button">${i}</button>
            </li>
        `;

        // inserts the above elements
        linkList.insertAdjacentHTML("beforeend", button);
    };
      
    // give the first pagination button a class of "active"
    document.querySelector('button').className = 'active';

    // create an event listener on the `link-list` element
    linkList.addEventListener('click', (e) => {
        let clicked = e.target;

        // if the click target is a button:
        if (clicked.tagName === 'BUTTON') {

            // removes the "active" class from the current active button
            document.querySelector('.active').className = '';

            // adds the active class to the clicked button
            clicked.className = 'active';

            // calls the showPage function passing the `list` parameter and page to display as arguments
            showPage(list, clicked.textContent);
        }
    });
}

// ==============================================================================

// Call functions
showPage(data, 1);
addPagination(data);

// ==============================================================================

/*
Extra Credit - Search Bar 
*/

// select the header element
const header = document.querySelector('.header');

// html markup for the searchbar
const searchBarHTML = `
    <div>
        <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
        </label>
    </div>
`;

// insert the above searchbar into the header element
header.insertAdjacentHTML("beforeend", searchBarHTML);

// ==============================================================================

/*
Extra Credit - Search Bar Functionality
*/

// select the search bar
const searchBar = document.getElementById('search');

// listen for search text input
searchBar.addEventListener('input', () => {
    // creates new empty array of 'data' objects
    let newData = [];
    // set the typed text to upper case and store as variable
    let searchInput = searchBar.value.toUpperCase();

    data.forEach((object) => {
        // select each name and upper case
        let fullName = `${object.name.first} ${object.name.last}`.toUpperCase();
        
        // check if search input is included in name
        if (fullName.includes(searchInput)) {
            // if so, push object to new array
            newData.push(object);
        }
    });



    // call showPage & addPagination functions with new array on each keystroke
    showPage(newData, 1);
    addPagination(newData);

    // if no names match search, display "no results found"
    if(newData.length === 0) {
        studentList.innerHTML = `
            <li>
                <h3 style="text-align: center; font-size: 3rem">No Results Found</h3>
            </li>
        `;
    }
});

// ==============================================================================