var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

// CSS SELECTORS
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';

// ESCAPE KEY
var ESC_KEY = 27;

// FUNCTION TO SET DETALS OF IMAGE AND TEXT
function setDetails(imageUrl, titleText) {
  'use strict'

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR)
  detailImage.setAttribute('src', imageUrl)

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
	detailTitle.textContent = titleText;
}

// FUNCTION TO GRAB IMAGE FROM THUMBNAIL
function imageFromThumb(thumb) {
  'use strict'
  return thumb.getAttribute('data-image-url')
}

// FUNCTION TO PULL DATA FROM THUMB/THUMBMNAIL
function titleFromThumb(thumb) {
	"use strict";
	return thumb.getAttribute("data-image-title");
}

// FUNCTION TO SET IMAGES TO TITLE
function setDetailsFromThumb(thumb) {
	setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
}

// FUNCTION TO SHOW THE CONTENTS OF THE PAGE
function showDetails() {
	"use strict";
	var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
	document.body.classList.remove(HIDDEN_DETAIL_CLASS);

	frame.classList.add(TINY_EFFECT_CLASS);
	setTimeout(function () {
		frame.classList.remove(TINY_EFFECT_CLASS);
	}, 50);
}

// FUNCTION TO ADD CLICK HANDLER TO THUMBNAIL...
function addThumbnailClickHandler(thumb) {
  'use strict'
  thumb.addEventListener('click', function (event) {
    event.preventDefault()
    setDetailsFromThumb(thumb)
    showDetails()
  })
}

// FUNCTION TO GRAB THUMBNAILS AND RETURN THUMBNAIL VALUE
function getThumbnailsArray() {
	"use strict";
	var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR)
  var thumbnailArray = [].slice.call(thumbnails)
  return thumbnailArray
}

// FUNCTION TO HIDE DETAILS
function hideDetails() {
  'use strict'
  document.body.classList.add(HIDDEN_DETAIL_CLASS)
}

// FUNCTION TO HAVE ESCAPE KEY REACT TO CLICK HANDLER
function addKeyPressHandler() {
  'use strict'
  document.body.addEventListener('keydown', function(e) {
    e.preventDefault()
    console.log(e.keyCode)
    if (e.keyCode === ESC_KEY) {
      hideDetails()
    }
  })
}

// FUNCTION TO INITIALIZE AND ACCESS PRESS KEY FUNCTION
function initializeEvents() {
  'use strict'
  var thumbnails = getThumbnailsArray()
  thumbnails.forEach(addThumbnailClickHandler)
  addKeyPressHandler()
}

// FUNCTION TO CALL INITIALIZE FUNCTION
initializeEvents()

