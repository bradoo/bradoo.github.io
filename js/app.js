function sec(e) {
	return 1e3 * e
}

function min(e) {
	return 6e4 * e
}

function timeToMs(e) {
	var t = min((e = e.split(":"))[0]).toPrecision(),
		o = sec(e[1]).toPrecision();
	return Number(t) + Number(o)
}

function msToTime(e) {
	var t = parseInt(e / 1e3 % 60),
		o = parseInt(e / 6e4 % 60),
		n = parseInt(e / 36e5 % 24);
	return (o = o < 10 ? "0" + o : o) + ":" + (t = t < 10 ? "0" + t : t)
}

function validate(e, t) {
	return !0 === t.test(e.value)
}

function onSpaceKey(e) {
	document.onkeypress = function(t) {
		32 == t.keyCode && "button" != document.activeElement.nodeName.toLowerCase() && (t.preventDefault(), e())
	}
}

function colorChange(e) {
	bgElement.style.backgroundColor = e
}

function reportTime() {
	if (currentTime += 1e3, clockElement.innerHTML = msToTime(currentTime), currentTime < minTime) colorChange(
		defaultColor);
	else if (currentTime === minTime) colorChange(minColor);
	else if (currentTime === midTime) colorChange(midColor);
	else if (currentTime === maxTime) colorChange(maxColor);
	else if (currentTime === dqTime) {
		var e = !0,
			t;
		pulsateIntervalId = setInterval((function() {
			!0 === e ? (colorChange(defaultColor), e = !1) : (colorChange(maxColor), e = !0)
		}), 300)
	}
}

function hideControls() {
	var e = document.getElementById("hideAway");
	TweenLite.to(e, .5, {
		css: {
			transform: "translate(-2000px)",
			opacity: "0",
			maxHeight: "0",
			margin: "0"
		}
	}), TweenLite.to(clockElement, .2, {
		css: {
			paddingLeft: "0"
		},
		delay: .5
	}), TweenLite.to(infoButton, .5, {
		css: {
			opacity: "0"
		}
	}), controlButton.className += " timerRunning", resetButton.className += " timerRunning"
}

function showControls() {
	var e = document.getElementById("hideAway"),
		t;
	if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 570) var o = TweenLite.to(clockElement,
		.2, {
			css: {
				paddingLeft: "300px"
			}
		});
	else wrapper.style.bottom = "auto";
	TweenLite.to(e, .5, {
		css: {
			transform: "translateY(0)",
			opacity: "1",
			maxHeight: "1000px",
			height: "auto"
		},
		delay: .2
	}), TweenLite.to(infoButton, .5, {
		css: {
			opacity: "1"
		}
	}), controlButton.className = controlButton.className.replace(/(?:^|\s)timerRunning(?!\S)/, "")
}

function showInfo() {
	TweenLite.to(bgElement, .5, {
		css: {
			filter: "blur(10px)"
		},
		delay: .2
	}), TweenLite.to(infoButton, .5, {
		css: {
			backgroundColor: "red",
			color: "white"
		},
		delay: 0
	}), TweenLite.to(infoWrapper, 0, {
		css: {
			display: "flex"
		}
	}), TweenLite.to(infoWrapper, .25, {
		css: {
			opacity: "1"
		},
		delay: .2
	}), infoButton.onclick = function() {
		hideInfo()
	}, infoButton.innerHTML = "x", gtag("event", "Info Displayed")
}

function hideInfo() {
	TweenLite.to(bgElement, .5, {
		css: {
			filter: "blur(0)"
		},
		delay: .2
	}), TweenLite.to(infoButton, .5, {
		css: {
			backgroundColor: "hsla(0, 0, 100, 0.7)",
			color: "black",
			fontSize: "1em",
			fontWeight: "400"
		},
		delay: .2
	}), TweenLite.to(infoWrapper, 0, {
		css: {
			display: "none"
		}
	}), TweenLite.to(infoWrapper, .5, {
		css: {
			opacity: "0"
		},
		delay: .2
	}), infoButton.onclick = function() {
		showInfo()
	}, infoButton.innerHTML = "i"
}

function hideTheClock() {
	TweenLite.to(clockElement, .2, {
		css: {
			color: "transparent"
		}
	}), TweenLite.to(grower, .2, {
		css: {
			backgroundColor: "transparent"
		}
	})
}

function showTheClock() {
	TweenLite.to(clockElement, .2, {
		css: {
			color: "rgba(255,255,255,0.3)"
		}
	}), TweenLite.to(grower, .2, {
		css: {
			backgroundColor: "rgba(255,255,255,0.7)"
		}
	})
}

function setCustomValues() {
	function e(e) {
		if (!e) return "";
		var t = e.length;
		if (void 0 === t) return e.checked ? e.value : "";
		for (var o = 0; o < t; o++)
			if (e[o].checked) return e[o].value;
		return ""
	}

	function t(e, t, o, n) {
		customGreenLight.value = e, customYellowLight.value = t, customRedLight.value = o, customDq.value = n, validateAll(
			customArray)
	}
	"tableTopics" === e(radioOptions) ? t("1:00", "1:30", "2:00", "2:30") : "evaluation" === e(radioOptions) ? t("2:00",
		"2:30", "3:00", "3:30") : "icebreaker" === e(radioOptions) ? t("4:00", "5:00", "6:00", "6:30") : "speech" === e(
		radioOptions) && t("5:00", "6:00", "7:00", "7:30")
}
function logTime(action){
	var currentDate=new Date();
	timerlog.append(action+" at "+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds());
}
var counter=1;
function startTimer() {
	if (0 != currentTime) return stopTimer(), !1;
	var msg="Time "+counter+": "+"Start";
	if(counter>1)
		logTime("\n"+msg);
	else
		logTime(msg);
	var e = [],
		t = [];
	for (i = 0; i < customArray.length; i++) !1 === validate(customArray[i], RegExp(/^[0-9]{1,2}:[0-5]{1}[0-9]{1}$/)) && e
		.push(customArray[i]);
	if (e.length > 0) {
		if (e.map((function(e) {
				"customGreenLight" === e.id ? t.push("green light") : "customYellowLight" === e.id ? t.push("yellow light") :
					"customRedLight" === e.id ? t.push("red light") : "customDq" === e.id && t.push("disqualification")
			})), 1 === t.length) {
			var o = "Whoops, the " + t[0] +
				" value does not look like it is formatted correctly. There are two accepted formats: \nMM:SS (example: 14:00) \nM:SS (example: 4:15) \nPlease correct it, and try again.";
			return alert(o)
		}
		if (2 === t.length) {
			var o = "Whoops, the " + t[0] + " and " + t[1] +
				" values do not look like they are formatted correctly. There are two accepted formats: \nMM:SS (example: 14:00) \nM:SS (example: 4:15) \nPlease correct them, and try again.";
			return alert(o)
		}
		if (3 === t.length) {
			var o = "Whoops, the " + t[0] + "," + t[1] + " and " + t[2] +
				" values do not look like they are formatted correctly. There are two accepted formats: \nMM:SS (example: 14:00) \nM:SS (example: 4:15) \nPlease correct them, and try again.";
			return alert(o)
		}
		if (3 === t.length) {
			var o =
				"Whoops, none of the time values look like they are formatted correctly. There are two accepted formats: \nMM:SS (example: 14:00) \nM:SS (example: 4:15) \nPlease correct them, and try again.";
			return alert(o)
		}
		var o =
			"Whoops, it looks like your formatted at least one of the time formats incorrectly. There are two accepted formats: \nMM:SS (example: 14:00) \nM:SS (example: 4:15) \nPlease correct them, and try again.";
		return alert(o)
	}
	minTime = timeToMs(customGreenLight.value), midTime = timeToMs(customYellowLight.value), maxTime = timeToMs(
			customRedLight.value), dqTime = timeToMs(customDq.value), controlButton.innerHTML = "Stop", controlButton.onclick =
		stopTimer, onSpaceKey(stopTimer), hideControls(), growerAnimation = TweenLite.to(grower, dqTime / 1e3, {
			css: {
				width: "100%"
			}
		}), clockElement.innerHTML = msToTime(0), clockIntervalId = setInterval(reportTime, 1e3), gtag("event", "Timer Start")
}

function stopTimer() {
	logTime(" Stop");
	controlButton.innerHTML = "Resume", controlButton.onclick = resumeTimer, showTheClock(), onSpaceKey(resetTimer),
		window.clearTimeout(minColorTimeoutId), window.clearTimeout(midColorTimeoutId), window.clearTimeout(maxColorTimeoutId),
		window.clearTimeout(fullColorTimeoutId), clearInterval(pulsateIntervalId), growerAnimation.pause(), clearInterval(
			clockIntervalId), TweenLite.to(resetButton, .5, {
			css: {
				transform: "translate(0)"
			}
		}), resetButton.onclick = function() {
			resetTimer()
		}, gtag("event", "Timer Stop")
}

function resumeTimer() {
	logTime(" Resume");
	controlButton.innerHTML = "Stop", controlButton.onclick = stopTimer, 0 == showClock.checked && hideTheClock(),
		TweenLite.to(resetButton, .5, {
			css: {
				transform: "translate(-2000px)"
			}
		}), onSpaceKey(stopTimer), growerAnimation.resume(), clockIntervalId = setInterval(reportTime, 1e3)
}

function resetTimer() {
	logTime(" Reset ");
	timerlog.append(" totally consumed time: "+parseInt(currentTime/1000/60)+" minutes "+currentTime/1000%60+" seconds " );
	controlButton.innerHTML = "Start", controlButton.onclick = startTimer, 0 == showClock.checked && hideTheClock(),
		currentTime = 0, clockElement.innerHTML = msToTime(currentTime), colorChange(defaultColor), growerAnimation.seek(0),
		showControls(), onSpaceKey(startTimer), TweenLite.to(resetButton, .5, {
			css: {
				transform: "translate(-2000px)"
			}
		})
	counter++;
}

function validateWatch(e) {
	timeout && (clearTimeout(timeout), timeout = null), timeout = setTimeout((function() {
		validateThis(e)
	}), 1e3)
}! function(e) {
	"use strict";
	var t = function(e, t, o) {
		e.addEventListener ? e.addEventListener(t, o, !1) : e.attachEvent("on" + t, o)
	};
	e.fitText = function(o, n) {
		var r = -1 / 0,
			i = 1 / 0,
			a = function(o) {
				var a = n || 1,
					l = function() {
						o.style.fontSize = Math.max(Math.min(o.clientWidth / (10 * a), parseFloat(i)), parseFloat(r)) + "px"
					};
				l(), t(e, "resize", l)
			},
			l, c = o.length;
		if (c)
			for (l = 0; l < c; l += 1) a(o[l]);
		else a(o);
		return o
	}
}(this), window.fitText(document.getElementById("clock"), .5);
var customArray = [document.getElementById("customGreenLight"), document.getElementById("customYellowLight"), document.getElementById(
		"customRedLight"), document.getElementById("customDq")],
	bgElement = document.getElementById("wrapper"),
	grower = document.getElementById("grower"),
	clockElement = document.getElementById("clock"),
	controlButton = document.getElementById("controlButton"),
	resetButton = document.getElementById("resetButton"),
	infoButton = document.getElementById("infoButton"),
	clockWrapper = document.getElementById("clockWrapper"),
	infoWrapper = document.getElementById("info"),
	customGreenLight = customArray[0],
	customYellowLight = customArray[1],
	customRedLight = customArray[2],
	customDq = customArray[3],
	showClock = document.getElementById("showClock"),
	clockIntervalId = void 0,
	minColorTimeoutId = void 0,
	midColorTimeoutId = void 0,
	maxColorTimeoutId = void 0,
	fullColorTimeoutId = void 0,
	pulsateIntervalId = void 0,
	currentTime = 0,
	minTime = void 0,
	midTime = void 0,
	maxTime = void 0,
	dqTime = void 0,
	growerAnimation = void 0,
	defaultColor = "hsl(0, 0%, 27%)",
	minColor = "hsl(119, 59%, 52%)",
	midColor = "hsl(51, 78%, 57%)",
	maxColor = "hsl(353, 76%, 58%)";
TweenLite.defaultEase = Linear.easeNone, infoButton.onclick = function() {
	showInfo()
}, showClock.addEventListener("change", (function() {
	0 == showClock.checked ? hideTheClock() : showTheClock()
}));
for (var radioOptions = document.querySelectorAll("#predefined input"), i = 0, timeout; i < radioOptions.length; i++)
	radioOptions[i].onclick = setCustomValues;
controlButton.onclick = function() {
	startTimer()
}, onSpaceKey(startTimer);
var validateThis = function(e) {
		!0 === /^[0-9]{1,2}:[0-5]{1}[0-9]{1}$/.test(e.value) ? e.className = "valid" : e.className = "invalid"
	},
	validateAll = function(e) {
		for (i = 0; i < e.length; i++) validateThis(e[i])
	};
//# sourceMappingURL=app.js.map
