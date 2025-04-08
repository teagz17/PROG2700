// function to update content and style
function updateContent() {
    // change the text of the paragraph
    document.getElementById('myParagraph').textContent = 'welcome to my website!';

    // change the background colour of the div
    document.getElementById('myDiv').style.backgroundColor = '#6699ff';

    //add a new list item to the unordered list
    const newItem = document.createElement('li');
    newItem.textContent = 'new item';
    document.getElementById('myList').appendChild(newItem)
}

// attach event listener to button
document.getElementById('updateButton').addEventListener('click', updateContent);