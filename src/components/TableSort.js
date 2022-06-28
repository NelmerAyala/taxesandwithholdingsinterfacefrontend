function table_sort() {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = `
          .sort-inactive span {
              visibility:hidden;
          }
          .sort-inactive:hover span {
              visibility:visible;
          }
          .sort-active span {
              visibility: visible;
          }
      `;
  document.head.appendChild(styleSheet);
  document.querySelectorAll("th.sort").forEach((th_elem) => {
    let asc = true;
    const span_elem = document.createElement("span");
    span_elem.style = "font-size:0.8rem; margin-left:0.5rem";
    span_elem.innerHTML = "▼";
    th_elem.appendChild(span_elem);
    th_elem.classList.add("sort-inactive");

    const index = Array.from(th_elem.parentNode.children).indexOf(th_elem);
    th_elem.addEventListener("click", (e) => {
      document.querySelectorAll("th.sort").forEach((elem) => {
        elem.classList.remove("sort-active");
        elem.classList.add("sort-inactive");
      });
      th_elem.classList.remove("sort-inactive");
      th_elem.classList.add("sort-active");

      if (!asc) {
        th_elem.querySelector("span").innerHTML = "▲";
      } else {
        th_elem.querySelector("span").innerHTML = "▼";
      }
      const arr = Array.from(
        th_elem.closest("table").querySelectorAll("tbody tr")
      );

      arr.sort((a, b) => {
        const a_val = a.children[index].innerText;
        const b_val = b.children[index].innerText;
        return asc ? a_val.localeCompare(b_val) : b_val.localeCompare(a_val);
      });

      arr.forEach((elem) => {
        th_elem.closest("table").querySelector("tbody").appendChild(elem);
      });
      asc = !asc;
    });
  });
}

export default table_sort;
