function makeTableRow(data) {
    return `
<tr>
    <th>${data.id}</th>
    <td>${data.ala}</td>
    <td>${data.bala}</td>
    <td>${data.portocala}</td>
</tr>
    `;
}

async function handle_submit(a, b, c) {
    let data = {
        ala: a,
        bala: b,
        portocala: c,
    };

    let request = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (request.ok) {
        let response = await request.json();
        response = response.map(makeTableRow).join("");
        document.querySelector("tbody").innerHTML = response;
    }
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let ala = e.target["ala"].value;
    let bala = e.target["bala"].value;
    let portocala = e.target["portocala"].value;

    handle_submit(ala, bala, portocala);
});
