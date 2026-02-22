let btn = document.getElementById("btn");
let job = document.getElementById("job");
const myForm = document.getElementById("form");
let editingCard = null;

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let name = document.getElementById("company-name").value;
    let position = document.getElementById("job-position").value;
    let location = document.getElementById("job-location").value;
    let desc = document.getElementById("job-description").value;
    let salary = document.getElementById("salary-range").value;

    if (editingCard) {
        editingCard.querySelector(".job-position").textContent = position;
        editingCard.querySelector(".job-name").textContent = name;
        editingCard.querySelector(".job-location").textContent = location;
        editingCard.querySelector(".job-desc").textContent = desc;
        editingCard.querySelector(".job-salary").textContent = salary;
        editingCard.dataset.position = position.toLowerCase();
        editingCard = null;
        btn.textContent = "Publish Job";
    } else {
        let div = document.createElement("div");
        div.classList.add("cart-job");
        div.dataset.position = position.toLowerCase();

        div.innerHTML = `
            <h1 class="job-position">${position}</h1>
            <h2 class="job-name">${name}</h2>
            <h4 class="job-location">${location}</h4>
            <p class="job-desc">${desc}</p>
            <p class="job-salary">$${salary}</p>
            <div class="card-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        div.querySelector(".delete-btn").addEventListener("click", () => {
            div.remove();
        });

        div.querySelector(".edit-btn").addEventListener("click", () => {
            document.getElementById("company-name").value = div.querySelector(".job-name").textContent;
            document.getElementById("job-position").value = div.querySelector(".job-position").textContent;
            document.getElementById("job-location").value = div.querySelector(".job-location").textContent;
            document.getElementById("job-description").value = div.querySelector(".job-desc").textContent;
            document.getElementById("salary-range").value = div.querySelector(".job-salary").textContent;
            editingCard = div;
            btn.textContent = "Update Job";
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        job.appendChild(div);
    }

    myForm.reset();
});

document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.toLowerCase().trim();
    const cards = document.querySelectorAll(".cart-job");

    cards.forEach(card => {
        if (!query || card.dataset.position.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
