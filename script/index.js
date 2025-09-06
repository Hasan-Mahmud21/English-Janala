const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn")
  // console.log(lessonButtons)
  lessonButtons.forEach(btn => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
       removeActive(); // remove active class
       const clickBtn = document.getElementById(`lesson-btn-${id}`);
       console.log(clickBtn)
       clickBtn.classList.add("active") // add active class
       displayLevelWord(data.data);
    });
};

// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

const displayLevelWord = (words) => {
//   console.log(words);

  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if(words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img src="./assets/alert-error.png" class="mx-auto">
        <p class="text-xl text-gray-400 font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>

      </div>
    `;
  }

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div")
    card.innerHTML = `
    <div class="rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
        <p class="font-semibold">Meaning/Pronunciation</p>
        <div class="font-bangla text-xl font-medium">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>

        </div>
      </div>
    `
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  // 1. get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. get into every lessons
  for (let lesson of lessons) {
    // 3. create Element
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn">
                 <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                  </button>
    `;

    // 4. append into container

    levelContainer.append(btnDiv);
  }
};

loadLessons();
