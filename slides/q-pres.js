function makeCanvas(width, height) {
	let canvas = $(`<canvas width='${width}' height = '${height}'></canvas>`);
	let container = $("<div class='canvas-container' />");
	container.css({
		width,
		height
	});
	container.append(canvas);
	return container;
}

function getPartyLocation(canvas, p) {
	let width = canvas.width();
	let height = canvas.height();
	switch(p) {
		case 1:
			return [width / 5, height / 5];
		case 2:
			return [4 * width / 5, height / 5];
		case 3:
			return [width / 5, 4 * height / 5];
		case 4:
			return [4 * width / 5, 4 * height / 5];
	}
}

function drawParty(container, partyID, isMalicious) {
	if(partyID < 1 || partyID > 4)
		throw "Invalid party ID";
	let canvas = container.find('canvas');
	let width = canvas.width();
	let height = canvas.height();
	let ctx = canvas[0].getContext("2d");
	ctx.lineWidth = 2;

	let [partyX, partyY] = getPartyLocation(canvas, partyID);
	let partyRadius = height / 10;

	let eraseRadius = partyRadius * 1.1;
	ctx.beginPath();
	ctx.rect(partyX - eraseRadius / 2, partyY - eraseRadius / 2,
		eraseRadius, eraseRadius);
	ctx.fillStyle = "white";
	ctx.fill();

	ctx.strokeStyle = isMalicious ? "#F00" : "#000";

	ctx.beginPath();
	ctx.arc(partyX, partyY, partyRadius, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.strokeStyle = "#000";

	let svg = $(MathJax.tex2svg(`P_${partyID}`)).find('svg');
	container.append(svg);
	svg.css({
		position: 'absolute',
		left: partyX - svg.width() / 2,
		top: partyY - svg.height() / 2
	});
	svg.on("load", () => {
		svg.css({
			position: 'absolute',
			left: partyX - svg.width() / 2,
			top: partyY - svg.height() / 2
		});
	});
}

function make4parties(container) {
	let canvas = container.find('canvas');
	let width = canvas.width();
	let height = canvas.height();
	let ctx = canvas[0].getContext("2d");
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.fillStyle = "white";
	ctx.fill();

	for(let i = 1; i <= 4; ++i) {
		drawParty(container, i);
	}
}

function drawLineBetweenParties(pi, pj, canvas, isArrow, color) {
	if(pi < 1 || pi > 4 || pj < 1 || pj > 4)
		throw "Invalid party ID";
	if(!color)
		color = "#000";
	let [piLocX, piLocY] = getPartyLocation(canvas, pi);
	let [pjLocX, pjLocY] = getPartyLocation(canvas, pj);

	// weights for interpolation
	let weightP = pi % 2 == pj % 2 ? 2 / 3 : 5 / 6;
	let weightQ = 1 - weightP;

	let startX = weightP * piLocX + weightQ * pjLocX;
	let startY = weightP * piLocY + weightQ * pjLocY;
	let endX = weightQ * piLocX + weightP * pjLocX;
	let endY = weightQ * piLocY + weightP * pjLocY;
	let ctx = canvas[0].getContext("2d");
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.strokeStyle = color;
	ctx.stroke();
	if(isArrow) {
		let dy = endY - startY;
		let dx = endX - startX;
		let theta = Math.atan2(dy, dx) + Math.PI;
		for(let dtheta of [-Math.PI / 6, Math.PI / 6]) {
			let r = 20;
			let t = theta + dtheta;
			let vx = endX + r * Math.cos(t);
			let vy = endY + r * Math.sin(t);
			ctx.beginPath();
			ctx.moveTo(vx, vy);
			ctx.lineTo(endX, endY);
			ctx.stroke();
		}
	}
	ctx.strokeStyle = "#000";
}

let currentSlide = 0;

function updateSlideContentVisibility() {
	let slideContents = $('.slide-content');
	for(let i = 0; i < slideContents.length; ++i) {
		let slideContent = slideContents.eq(i);
		let visibleFrom = slideContent.data('visible-from');
		if(visibleFrom != null) {
			slideContent.css('visibility',
				currentSlide >= visibleFrom ? 'visible' : 'hidden');
		}

		let visibleUntil = slideContent.data('visible-until');
		if(visibleUntil != null && currentSlide > visibleUntil) {
			slideContent.remove();
		}
	}
}

function main() {
	updateSlideContentVisibility();
	nextSlide();
	$('body').keydown(e => {
		if(e.key == "ArrowRight") {
			currentSlide++;
			updateSlideContentVisibility();
			nextSlide();
		}
	});
}

