const loadlessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((les) => les.json())
    .then((les_json) => displaylessons(les_json.data));
};

const load_level_word = (id) => {
    spinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(word => word.json())
    .then(word_json => { 
        lesson_button()
        const lesson_btn = document.getElementById(`lesson_btn_${id}`)
        lesson_btn.classList.add("active_btn")

        display_level_word(word_json.data)

    })
}

const load_word_detail = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
    .then(dtl => dtl.json())
    .then(dtl_json => display_word_details(dtl_json.data))
}

const create_syn = (arr) => {
    const syn_elements = arr.map((elem) => `<span class="btn btn-soft btn-primary">${elem}</span>`)
    return syn_elements.join(" ")
}

const spinner = (status) => {
     if(status == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word_container").classList.add("hidden")
     }

     else{
        document.getElementById("word_container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
     }
}

const display_word_details = (word) => {
    const detail_container = document.getElementById("details_container")
    detail_container.innerHTML = ""
    detail_container.innerHTML = `
            <div class="">
                    <h2 class="font-bold text-2xl">${word.word}(<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h2>
                    <h2 class="font-bold mt-3">Meaning</h2>
                    <p class="font_bangla font-bold text-gray-600 my-1">${word.meaning}</p>
                    <h2 class="font-bold mt-3">Example</h2>
                    <p class="font-bold text-gray-600 my-1">${word.sentence}</p>
                    <h2 class="font-semibold font_bangla mt-3">সমার্থক শব্দ গুলো</h2>
                    <div class="flex items-center gap-2">
                        ${create_syn(word.synonyms)}
                    </div>
                </div>
    `
    document.getElementById("my_modal_5").showModal()
}

const lesson_button = () => {
    const lesson_btns = document.querySelectorAll(".lesson_btn")
    lesson_btns.forEach(btn => btn.classList.remove("active_btn"))
}

const display_level_word = (words) => {
    const word_container = document.getElementById("word_container")
    word_container.innerHTML = ""

    if(words.length == 0){
    word_container.innerHTML = `
        <div class=" col-span-3">
                    <div class="bg-gray-100 py-17 px-15 rounded-xl text-center">
                        <img src="assets/alert-error.png" alt="" class="mx-auto mb-2">
                        <p class="text-xs text-gray-500 mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                        <h2 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h2>
                    </div>
                </div>
        `        
    }

    for (let word of words){
        const word_div = document.createElement("div")
        word_div.innerHTML = `
                <div class="text-center px-12 py-5 rounded-xl bg-white">
                <h2 class="font-bold text-2xl">${word.word ? word.word:"word not found"}</h2>
                <p class="text-xs font-bold my-3">Meaning /Pronounciation</p>
                <h2 class="font_bangla text-gray-600 font-bold">${word.meaning ? word.meaning : "Meaning not found"} /${word.pronunciation ? word.pronunciation : "pronunciation not found"}</h2>
                <div class="flex items-center justify-between mt-10">
                    <i onclick="load_word_detail(${word.id})" class="fa-solid fa-circle-info"></i>
                    <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
        `
        word_container.append(word_div)
    }
    spinner(false)
}

const displaylessons = (lessons) => {
    //console.log(lessons)
    const lesson_container = document.getElementById("lesson_container")
    lesson_container.innerHTML = ""
    
    for (let lesson of lessons){
        const btn_div = document.createElement("div")
        btn_div.innerHTML = `<button id="lesson_btn_${lesson.level_no}" onclick="load_level_word(${lesson.level_no})" class="lesson_btn btn btn-soft btn-primary border-2 border-blue-700"><a><i class="fa-solid fa-book-open"></i>  Lesson - ${lesson.level_no}</a></button>
        `

        lesson_container.appendChild(btn_div)
    }
}

loadlessons()

// search functions
document.getElementById("btn_search").addEventListener("click", () => {
    //removeActive();
    const search_txt = document.getElementById("search_txt").value.trim().toLowerCase()

    const url = `https://openapi.programming-hero.com/api/words/all`
    fetch(url)
    .then(res => res.json())
    .then(all_words_json => {
        const all_words = all_words_json.data
        const filter_words = all_words.filter(word => word.word.toLowerCase().includes(search_txt))
        display_level_word(filter_words)
    })
})