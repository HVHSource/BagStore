// import here !!!
import loading from './loading';
import map from './map';
import mapping from "./mapping";


// Script Cho Tab
class Tab {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[toggle-for]")
			this.contentList = this.selector.querySelectorAll("[tab-id]")
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = this.selector.querySelector(`[tab-id='${tabTarget}']`);
				element.classList.add("active");
				Array.prototype.forEach.call(this.titleList, (eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none"
						tabContentElement.classList.remove("show")
					}
				});
				targetDOM.style.display = "block",
					setTimeout(() => {
						targetDOM.classList.add("show")
					}, 50);
			})
		})
	}

	activeFirstTab() {
		this.titleList[0].click();
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
	}
}

// HEADER
const activeHeader = () => {

	let heightHeader = document.querySelector('header').offsetHeight;

	if (window.scrollY > heightHeader) {
		document.querySelector('header').classList.add('active');
	} else {
		document.querySelector('header').classList.remove('active');
	}
}

// ACTIVE ITEM MENU BY URL
function activeMenuByUrl() {
	var url = window.location.href.split('/').pop();

	let listNavItem = $('.nav-item a');
	listNavItem.each(function() {
		let currenUrl = $(this).attr('href');
		if (url.includes(currenUrl)) {
			$(this).parents('.nav-item').addClass('active');
		}
	})
}

// CONTROL SVG
const SVG = () => {
	jQuery('img.svg').each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');
	});
}

// SHOW BUTTON BACK TO TOP
const showBackToTop = () => {
	let currentScroll = document.querySelector('body').clientHeight - (window.innerHeight + 200);
	if (window.scrollY >= currentScroll) {
		document.getElementById('back-to-top').style.display = 'flex';
		setTimeout(() => {
			document.getElementById('back-to-top').classList.add('show');
		}, 0);
	} else {
		document.getElementById('back-to-top').style.display = 'none';
		document.getElementById('back-to-top').classList.remove('show');
	}
}

// CLICK GO TOP
const clickGoTop = () => {
	let goTopButton = document.getElementById('back-to-top')
	goTopButton.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})
}


// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	// LOADING
	loading();
	// WOW
	new WOW().init();
	// GOOGLEMAP
	map();
	// SVG CONTROL
	SVG();
	// HEADER
	activeMenuByUrl()
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener('scroll', () => {
	// ACTIVE HEADER WHEN SCROLL
	activeHeader();
	// BACK TO TOP
	showBackToTop();
})