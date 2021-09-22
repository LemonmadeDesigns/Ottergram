// USING ATTRIBUTES TO GRAB DATA
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

// CSS SELECTORS
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';

// ESCAPE KEY
var ESC_KEY = 27;

var imageKey = 0;
const images = getThumbnailsArray()
console.log('images')
console.table(images)
// FUNCTION TO SET DETALS OF IMAGE AND TEXT
function setDetails(imageUrl, titleText) {
  'use strict'

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR)
  detailImage.setAttribute('src', imageUrl)

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
	detailTitle.textContent = titleText;
}

// FUNCTION TO GRAB IMAGE FROM THUMBNAIL
function keyFromThumb(thumb) {
  return thumb.getAttribute('data-id')
}

function imageFromThumb(thumb) {
  'use strict'

  // RETURNING URL
  return thumb.getAttribute('data-image-url')
}

// FUNCTION TO PULL DATA FROM THUMB/THUMBMNAIL
function titleFromThumb(thumb) {
	("use strict");

	// RETURNING TITLE
	return thumb.getAttribute("data-image-title");
}

// FUNCTION TO SET TITLE TO IMAGES
function setDetailsFromThumb(thumb) {
  const key = keyFromThumb(thumb)

  imageKey = key;

  console.log("hi IM thumb ", imageKey)

	setDetails(imageFromThumb(thumb), titleFromThumb(thumb), imageKey);
}

// FUNCTION TO SHOW THE CONTENTS OF THE PAGE
function showDetails() {
	("use strict");
	var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
	document.body.classList.remove(HIDDEN_DETAIL_CLASS);

	// ADDING CSS
	frame.classList.add(TINY_EFFECT_CLASS);

	// REMOVING CSS
	setTimeout(function () {
		frame.classList.remove(TINY_EFFECT_CLASS);
	})
  // 50);
}

function addThumbnailClickHandler(thumb, thumbKey) {
// FUNCTION TO ADD CLICK HANDLER TO THUMBNAIL...
  'use strict'

  // ON CLICK.. SHOW DETAILS FROM THUMB AND CALL SHOW DETAILS FUNCTION
  thumb.addEventListener('click', function (event) {
    thumb.setAttribute("data-id", thumbKey);
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
	("use strict");

	// ADDING CSS CLASS
	document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

// FUNCTION TO HAVE ESCAPE KEY REACT TO CLICK HANDLER
function addKeyPressHandler() {
  'use strict'
  document.body.addEventListener('keydown', function(e) {
    e.preventDefault()
    console.log(e.keyCode)

    // IF KEYCODE IS EQUAL TO THE ESCAPE KEY, HIDE DETAILS
    if (e.keyCode === ESC_KEY) {
      hideDetails()
    }
  })
}

// FUNCTION TO INITIALIZE AND ACCESS PRESS KEY FUNCTION
function initializeEvents() {
  'use strict'
  var thumbnails = getThumbnailsArray()
  thumbnails.forEach((thumbnail, index) => addThumbnailClickHandler(thumbnail, index))
  addKeyPressHandler()
}


// ================= SLIDER FUNCTION ================= //

// THIS FUNCTION DISPLAYS THE NEXT IMAGE IMAGE
function nextImage() {
  console.log('Before NextImage imageKey', imageKey)
    if (imageKey < images.length - 1) {
    const imageKeyPlusOne = imageKey++;
    const updatedThumbnail = images[imageKeyPlusOne]
    setDetails(updatedThumbnail);
  }     
  console.log("After NextImage imageKey", imageKey);
}


// THIS FUNCTION DISPLAYS THE PREVIOUS IMAGE
function previousImage() {
  // TODO
  console.log("Before PrevImage imageKey", imageKey);
  if (imageKey > 0) {
		const imageKeyPlusOne = imageKey--;
		const updatedThumbnail = images[imageKeyPlusOne];
		setDetails(updatedThumbnail);

		// } else {
	}
  console.log("After PrevImage imageKey", imageKey);
}


// THIS FUNCTION CHECKS THE ARROWS
function checkArrows(i) {
  if (i == 0) {
    $("#rightArrow").css("display", "inline");
    $("#leftArrow").css("display", "none");
  } else if (i == images.length - 1) {
    $("#rightArrow").css("display", "none");
    $("#leftArrow").css("display", "inline");
  } else {
    $("#rightArrow").css("display", "inline");
    $("#leftArrow").css("display", "inline");
  }
}

$("#rightArrow").click(function () {
  if (imageKey < images.length - 1) {
    nextImage();
  }
});

$("#leftArrow").click(function () {
  if (imageKey > 0) {
    previousImage();
  }

});

// FUNCTION TO CALL INITIALIZE FUNCTION
initializeEvents()

