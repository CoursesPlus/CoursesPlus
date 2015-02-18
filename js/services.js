var services = {
	planbook: {
		displayName: "Planbook",
		description: "Displays events from daltonplanner.org in your calendar.",
		type: "calendar",
		permissions: ["*://daltonplanner.org/"],
		requires: [],
		onEnable: function() {
			// TODO: signin
		},
		createCalendarEvents: function() {
			// TODO: get events
			// Should the request be on-demand or in the background?
		}
	},
	lunchMenu: {
		displayName: "Lunch menu",
		description: "Displays what's for lunch in the sidebar.",
		type: "block",
		permissions: ["*://www.myschooldining.com/"],
		requires: [],
		onEnable: function() {
			// TODO: nothing!
		},
		createBlock: function() {
			// TODO: get lunch menu from http://www.myschooldining.com/dalton/?cmd=menus
			// This shouldn't change every day, so maybe some sort of caching?
			// Maybe a RSS I don't know if they have one.
		}
	},
	schedules: {
		displayName: "Schedules",
		description: "Displays what classes you've got next in the sidebar.",
		type: "block",
		permissions: ["*://schedules.dalton.org/"],
		requires: [],
		onEnable: function() {
			// TODO: signin
			// Does Schedules have an API to hook in to? How long do session cookies last?
		},
		createBlock: function() {
			// TODO: get events
			// This shouldn't change much, so maybe some sort of caching (with a force refresh option)?
		}
	}
	archivedCourses:
		displayName: "Archived Courses",
		description: "Allows Courses+to work on Archived Courses",
		type: "block", // I do not know what to put here.
		permissions: ["*://.dalton.org/"],
		requires: [],
		onEnable: function() {
			// TODO: Change a bunch of links in the code. This should be simple.
		},
	}
		athletecs: {
		displayName: "Athletics",
		description: "Displays what classes you've got next in the sidebar.",
		type: "block",
		permissions: ["http://www.dalton.org/program/athletics/schedules"],
		requires: [],
		onEnable: function() {
			// TODO: ajax.
		},
		createBlock: function() {
			// TODO: get events and games.
		}
};

window.services = services;