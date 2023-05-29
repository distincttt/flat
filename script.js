const input = document.getElementById('first');
const submit = document.getElementById('submit');

input.addEventListener('change', (e) => {
	console.log(e.target.value);
});
