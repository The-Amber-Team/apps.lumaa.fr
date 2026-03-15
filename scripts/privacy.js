(function () {
	var selectorsCount = 0;

	window.onload = () => {
		let selectors = document.querySelectorAll(".apps button");
		selectorsCount = selectors.length - 1;
		
		const queries = new URLSearchParams(window.location.search);
		const keeper = qtoint(queries);

		selectors.forEach((elm, key) => {
			let changer = document.getElementById(`sel-${key}`);
			if (key !== keeper) {
				if (changer) {
					changer.style.display = "none";
				}
			} else {
				let sections = document.querySelectorAll(".section:not(.force-show)");
				sections.forEach((elm) => (elm.style.display = "none"));
				changer.style.display = "initial";

				elm.classList.add("selected");
			}

			elm.onclick = () => {
				let oldSelected = document.querySelector(".selector.selected");
				oldSelected.classList.remove("selected");
				elm.classList.add("selected");

				let sections = document.querySelectorAll(".section:not(.force-show)");
				sections.forEach((elm) => (elm.style.display = "none"));
				changer.style.display = "initial";
			};
		});
	};

	/**
	 * @param {URLSearchParams} params
	 * @returns {number} The index of the category to keep
	 */
	function qtoint(params) {
		var keep = 0;
		if (params.has("app")) {
			let param = params.get("app");
			if (
				param.toLowerCase() == "threaded" ||
				param.toLowerCase() == "bubble"
			) {
				keep = 1;
			} else if (param.toLowerCase() == "artisticly") {
				keep = 2;
			} else if (param.toLowerCase() == "swiftseerr") {
				keep = 3;
			} else {
				keep = 0;
			}
		}
		return Math.max(0, Math.min(keep, selectorsCount));
	}
})();
