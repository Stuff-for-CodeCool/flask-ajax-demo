const rez = document.querySelector("#rez");

document.querySelectorAll("p > a").forEach((a) => {
    a.addEventListener("click", async (e) => {
        e.preventDefault();

        const method = e.target.dataset.method;
        const url = e.target.href;

        let options = {
            method: method,
            headers: { "Content-Type": "application/json" },
        };

        if (method === "post" || method === "put") {
            options = {
                ...options, //  <- everything that options had up to this point
                body: JSON.stringify({ data: e.target.dataset.data }),
            };
            //  ^ is equivalent to v
            // options["body"] = JSON.stringify({ data: e.target.dataset.data });
        }

        const request = await fetch(url, options);
        if (!request.ok) {
            rez.innerText = "Something went wrong";
        }

        const response = await request.json();
        rez.innerText = JSON.stringify(response, null, 4);
    });
});
