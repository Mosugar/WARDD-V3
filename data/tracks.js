// Tracks for the "Dernières sorties" section, in the same order as the
// WARDD PLAYLIST on Spotify (open.spotify.com/playlist/2GznjCPT7BhHuci5z2gLMt).
// To add a release: add a line with the ID from its Spotify link
//   https://open.spotify.com/track/<THIS_PART>
// Covers are fetched automatically; title and artist below are used as-is.
const TRACKS = [
  ["6bKWAXMV2S1aimATCL7bUU", "TRIP TLA3", "Flipooo"],
  ["7085mckZcZSlEeFsmkhHBg", "SA3A", "OMFLOW"],
  ["3IxwyEJPyeWcMZHVZ6OMbp", "Douwara", "Youzar music"],
  ["5C3ELRGBnth9x69FfKj9dk", "ARIGATO", "ABDELv"],
  ["766GuXqkVG2RNJHtRTGhZb", "I Got You", "Médii"],
  ["17c4DPqudDbSGRdUKvIu5O", "BALI F CIEL", "Flipooo"],
  ["1CFKAVlA9kUwO5l4NqDVFt", "Topaz", "This ICY"],
  ["5r2ChVy981wysLw7947oqk", "See you in the crowd", "Médii"],
  ["7kNgCY3U1EXmLlxI9rjghO", "Sarab", "Youcef Riad"],
  ["6NuQTF90fzQhejBAH5JPaK", "Anti Saint", "OMFLOW"],
  ["2xNMlZRscen8MP3d7aH5e7", "Klma", "Rachid Goudi"],
  ["1CkB42RbAw4Wbcd8vhH74t", "Wawah", "Anas Fahassa"],
  ["71KQKDpTNgE6YYxF2tBvJB", "Warrior", "OMFLOW"],
  ["7yKnHZJmnRoCB3cgdkybTS", "Sapphire", "This ICY"],
  ["0O35OVOey0aJxpfx2O4wdG", "Rifaq", "OMFLOW, M2ODY"],
  ["3AOfIBlviBQR80TtautjDk", "FHEMTINI?", "Said.saviola"],
  ["6H7g2D6qPuMQtPbgUU4b0p", "TSUNAMI", "ABDELv"],
  ["0BRrRMQXLINPqV86Zm8fVZ", "I'm back", "OMFLOW, l-xper"],
  ["3Gj0qkiD3KUbnfgsgSWlqC", "Badadi - remix", "IMRAN, Oussama Faleh"],
  ["74BHqwtauWi2JYYdeT29ue", "Akkari", "Said.saviola"],
  ["0p1baWkCzviAMwUZ2I2LkP", "ROU!NA", "H2V"],
  ["4ySZTOmMl3WxOFfgK9qphD", "Rise and Fall Again", "Zhor"],
  ["0YR92IzIgCbk8dYV2m0D7T", "LA MERDA", "Reauto"],
  ["7BNavUWi6Dvj11U4DiMcCi", "Flip That", "Médii"],
  ["3T2wnWn2KCaRGk7fLvseo2", "رومانتيكو", "Youzar music"],
  ["6Fiy3rZe5Ps5Ww4aG9sDhy", "BEAST", "warddmusic"],
  ["6kNKyOfMWinNgRraIWRw5H", "Lghaltan", "Anas Fahassa"],
  ["4gV700by37eebOxyy8Xaep", "Say You Love Me", "Zhor"],
  ["30RhlnrYnf5M3AKOlwKhm5", "Mickeymons", "l-xper"],
  ["1LHYsL63lMScTcNLBsJd6P", "LHAMDOLLAH", "Said.saviola"],
  ["0Od6HvcQxmxmo43rDvTPjh", "Forssa", "Youzar music"],
  ["2H52Y3Dtc4jPBXQYzQJvLl", "Ana Wyak", "warddmusic"],
  ["6wFRpEwn30UOVy64rRJYS7", "(Ramadan) رمضان", "Youcef Riad"],
  ["6vUosucdBcoj9SkDgQqMyK", "Gone Too Soon", "Zhor"],
  ["0mzWzP3TA6KqTcT3qQKEyd", "Mali", "Frenchy The Real"],
  ["3PDeECveYXOPqbYYDF28mS", "Time Zones", "Médii"],
  ["6CEBnZj3cNBSdt0scvvomx", "Bghak Moulana", "Zhor"],
  ["4Spy02zENUhyVzbxHWzafa", "Monafi9in", "warddmusic"],
  ["2RJ17m6UuAYMmB976lKxry", "I Lost My Passion", "Zhor"],
  ["5hEKe22GpoUmFBqbsncCoQ", "Fall from Grace", "Zhor"],
  ["7d11ZfvabCLpJOXiDSEeX3", "My Way Out", "Zhor"],
  ["4utBNfCUgrW8OhoX8sLM0o", "Broken Tears", "Zhor"],
  ["6S3F84DukJ8eQBCoaabF9i", "7/8 Shots", "Médii"],
  ["0Epnvo73XeRWSgIWPPVZn1", "The Other Side", "Zhor"],
  ["6mdgBi2LWjIhqaM9HqYlwU", "HOUSS", "Reauto"],
  ["2dr2RV032AG5gdqMprNiFK", "Don't You Forget", "Zhor"],
  ["5WjyOPRdl1nVl30VPMEP6Q", "Bla Libitiz", "Said.saviola"],
  ["6fwDLqI5ewLJbiBxm64G52", "KI NHAR KI LIL", "ZDINDA"],
];

export const TRACK_IDS = TRACKS.map(([id]) => id);

// Title / artist per track (you can also add cover or color here to override Spotify)
export const OVERRIDES = Object.fromEntries(TRACKS.map(([id, title, artist]) => [id, { title, artist }]));
