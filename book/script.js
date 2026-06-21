const bookTitleInput = document.querySelector("#book-title");
const authorNameInput = document.querySelector("#author-name");
const categorySelect = document.querySelector("#category");
const filterSelect = document.querySelector("#filter");

const addBookBtn = document.querySelector("#addbook-btn");
const searchInput = document.querySelector("#search");

const booksContainer = document.querySelector("#all-books");


let books = [];
console.log(books);


addBookBtn.addEventListener("click",()=>{
    let id = Date.now();
    let bookTitle = bookTitleInput.value;
    let authorName = authorNameInput.value;
    let category = categorySelect.value;
  if (bookTitleInput.value.trim() === "" || authorNameInput.value.trim() === "") {
    return;
}

    let bookdata = {
          id: id,         
          title : bookTitle,
          author: authorName,
          category: category
    }

    books.push(bookdata);
    bookTitleInput.value = "";
authorNameInput.value = "";
categorySelect.value = "";
    renderBook()
})

 function renderBook(){
   booksContainer.innerHTML = "" 
   books.forEach((e)=>{
      let bookDiv = document.createElement("div")
      bookDiv.classList.add("book-card");
      let h = document.createElement("h2")
      let h3 = document.createElement("h3")
      let p = document.createElement("p")
      let deletebtn = document.createElement("button")
      deletebtn.innerText = "delete"
      let editbtn = document.createElement("button")
      editbtn.innerText = "edit"
      bookDiv.append(h,p,h3,deletebtn,editbtn);
      h.textContent = e.title;
      p.textContent = e.author;
      h3.textContent = e.category
      booksContainer.append(bookDiv);
      
      deletebtn.addEventListener("click", () => {
      books = books.filter((item) => {
        return item.id !== e.id;
    });

     renderBook();
});
})
}