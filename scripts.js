/**Importing of all relevvent information from the data script. Otherwise there is no information to populate */
import { books } from "./data.js";
import { authors } from "./data.js";
import { genres } from "./data.js";
const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};
const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};
/**This fragment is created to house information or nodes that we will like to apend to our html once they are fully created.
 *  This pretty much includes how we would like the nodes to be displayed on html. When a book , is clicked on, a preview of the
 * book should pop up with the author name, title of the book and genre
 *
 */

const fragment = document.createDocumentFragment();
let startIndex = 0;
let endIndex = 36;
const extracted = books.slice(startIndex, endIndex);
for (let i = 0; i < extracted.length; i++) {
  const preview = document.createElement("dl");
  preview.className = "preview";
  preview.dataset.id = books[i].id;
  preview.dataset.title = books[i].title;
  preview.dataset.image = books[i].image;
  preview.dataset.subtitle = `${authors[books[i].author]} (${new Date(
    books[i].published
  ).getFullYear()})`;
  preview.dataset.description = books[i].description;
  preview.dataset.genre = books[i].genres;
  preview.innerHTML = /*html*/ `
      <div>
      <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}<dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>`;
  fragment.appendChild(preview);
}

const booklist1 = document.querySelector("[data-list-items]");
booklist1.appendChild(fragment);
const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";

});
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});
//Settings
const settingbutton = document.querySelector("[data-header-settings]");
settingbutton.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
});
const settingCancel = document.querySelector("[data-settings-cancel]");
settingCancel.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
});
/**Seleection of relevent css elements in order to give us control of buttons created.
 *  The buttons need to be functioning fo the website o be responsive.
 *  When detailsToggle is called upon in the code, we want all the data therein to run 
 *  */
const detailsToggle = (event) => {
  const overlay1 = document.querySelector("[data-list-active]");
  const title = document.querySelector("[data-list-title]");
  const subtitle = document.querySelector("[data-list-subtitle]");
  const description = document.querySelector("[data-list-description]");
  const image1 = document.querySelector("[data-list-image]");
  const imageblur = document.querySelector("[data-list-blur]");
  event.target.dataset.id ? (overlay1.style.display = "block") : 'id missing';
  event.target.dataset.description ? (description.innerHTML = event.target.dataset.description) : 'no description';
  event.target.dataset.subtitle ? (subtitle.innerHTML = event.target.dataset.subtitle) : 'no subtitle';
  event.target.dataset.title ? (title.innerHTML = event.target.dataset.title) : 'title missinfg';
  event.target.dataset.image ? image1.setAttribute("src", event.target.dataset.image) : 'no image';
  event.target.dataset.image ? imageblur.setAttribute("src", event.target.dataset.image) : undefined;
  };
const detailsClose = document.querySelector("[data-list-close]");
detailsClose.addEventListener("click", (event) => {
  document.querySelector("[data-list-active]").style.display = "none";
});
const bookclick = document.querySelector("[data-list-items]");
bookclick.addEventListener("click", detailsToggle);
const authorSelect = document.querySelector("[data-search-authors]");
for (const authorId in authors) {
  const optionElement = document.createElement("option");
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorSelect.appendChild(optionElement);
}
const genreSelect = document.querySelector("[data-search-genres]");
for (const genreId in genres) {
  const optionElement = document.createElement("option");
  optionElement.value = genreId;
  optionElement.textContent = genres[genreId];
  genreSelect.appendChild(optionElement);
}
/**This code provides the user with the option of changing the theme for his/her UX.
 * It only changes between light and dark 
 */
const dataSettingsTheme = document.querySelector("[data-settings-theme]");
const saveButton = document.querySelector(
  "body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"
);
saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (dataSettingsTheme.value === "day") {
    document.querySelector("body").style.setProperty("--color-dark", day.dark);
    document
      .querySelector("body")
      .style.setProperty("--color-light", day.light);
    appoverlays.settingsOverlay.close();
  }
  if (dataSettingsTheme.value === "night") {
    document
      .querySelector("body")
      .style.setProperty("--color-dark", night.dark);
    document
      .querySelector("body")
      .style.setProperty("--color-light", night.light);
    appoverlays.settingsOverlay.close();
  }
});
/**This function allows the user to access more books on the database as all of them can't be shown in one page
 * The user should be able to see the next set of books and continue wothout repetition.
 */

const showMoreButton = document.querySelector("[data-list-button]");
const numItemsToShow = Math.min(books.length - endIndex);
const showMoreButtonText = `Show More (${numItemsToShow})`;
showMoreButton.textContent = showMoreButtonText;
showMoreButton.addEventListener("click", () => {
  const fragment = document.createDocumentFragment();
  startIndex += 36;
  endIndex += 36;
  const startIndex1 = startIndex;
  const endIndex1 = endIndex;
  const extracted = books.slice(startIndex1, endIndex1);
  for (const {
    author,
    image,
    title,
    id,
    description,
    published,
  } of extracted) {
    const preview = document.createElement("dl");
    preview.className = "preview";
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${new Date(
      published
    ).getFullYear()})`;
    preview.dataset.description = description;
    preview.innerHTML = /*html*/ `
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`;
    fragment.appendChild(preview);
  }
  const booklist1 = document.querySelector("[data-list-items]");
  booklist1.appendChild(fragment);
});


    
    
      
   
    
  

