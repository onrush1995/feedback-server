// write a function to retrieve a blob of json
// make an ajax request! Use 'fetch' function

// function fetchAlbums() {
//     fetch('http://rallycoding.herokuapp.com/api/music_albums')
//     .then(res => res.json())
//     .then(json => console.log(json));
// }

// fetchAlbums();

// async function fetchAlbums() {
const fetchAlbums = async () => {
	const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
	const json = await res.json();
	console.log(json);
};

fetchAlbums();
