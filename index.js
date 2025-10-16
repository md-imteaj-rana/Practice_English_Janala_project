const loadlessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((les) => les.json())
    .then((les_json) => displaylessons(les_json.data));
};

const displaylessons = (lessons) => {
    console.log(lessons)
    const lesson_container = document.getElementById("lesson_container")
    lesson_container.innerHTML = ""
    
    for (let lesson of lessons){
        const btn_div = document.createElement("div")
        btn_div.innerHTML = `<button class="btn btn-soft btn-primary border-2 border-blue-700"><a href=""><i class="fa-solid fa-book-open"></i>  Lesson - ${lesson.level_no}</a></button>
        `

        lesson_container.appendChild(btn_div)
    }
}

loadlessons()