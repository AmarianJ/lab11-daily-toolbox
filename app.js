// --- DAD JOKE ---
const jokeText = document.getElementById('joke-text');
const newJokeBtn = document.getElementById('new-joke-btn');

async function loadJoke() {
  jokeText.textContent = 'Loading...';
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Joke API failed');
    const data = await response.json();
    jokeText.textContent = data.joke;
  } catch (err) {
    jokeText.textContent = 'Could not load a joke. Please try again.';
    console.error(err);
  }
}

newJokeBtn.addEventListener('click', loadJoke);
loadJoke(); 

// --- DICTIONARY ---
const wordForm = document.getElementById('word-form');
const wordInput = document.getElementById('word-input');
const definitionOutput = document.getElementById('definition-output');

async function lookupWord(word) {
  definitionOutput.innerHTML = '<p>Looking up...</p>';
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );
    if (!response.ok) throw new Error('Word not found');
    const data = await response.json();
    
    const entry = data[0];
    const meanings = entry.meanings.map(m => {
      const defs = m.definitions.map(d => `<li>${d.definition}</li>`).join('');
      return `<h4>${m.partOfSpeech}</h4><ul>${defs}</ul>`;
    }).join('');
    
    definitionOutput.innerHTML = `<h3>${entry.word}</h3>${meanings}`;
  } catch (err) {
    definitionOutput.innerHTML = `<p>No definition found for "<strong>${word}</strong>".</p>`;
    console.error(err);
  }
}

wordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const word = wordInput.value.trim();
  if (word) lookupWord(word);
});