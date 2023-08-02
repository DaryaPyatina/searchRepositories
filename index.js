const repositories_per_page = 5;
const menu = document.querySelector(".menu");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const dataText = document.querySelector(".list-item");
const close = document.querySelector(".close");
const wrapperListItem = document.querySelector(".wrapper-list-item");

const searchRepositories = async function (event) {
  if (event.target.value.trim()) {
    let response = await fetch(
      `https://api.github.com/search/repositories?q=${event.target.value}&per_page=${repositories_per_page}`
    );

    if (response.status === 200) {
      list.innerHTML = " ";
      menu.classList.add("show_menu");
      let data = await response.json();
      console.log(data.items);
      data.items.forEach((item) => {
        const lis = document.createElement("li");
        lis.classList.add("menu-item");
        lis.innerText = `${item.name.slice(0, 10)}...`;
        list.appendChild(lis);

        lis.addEventListener("click", function () {
          menu.classList.remove("show_menu");
          input.value = "";
          const listItem = document.createElement("ul");
          listItem.classList.add("list-item");
          wrapperListItem.appendChild(listItem);

          wrapperListItem.classList.add("wrapper-list-item-show");
          const liText = document.createElement("li");
          liText.classList.add("text");
          liText.innerText = `Name: ${item.name.slice(0, 10)}\n Owner: ${
            item.owner.login
          }\n Stars: ${item.stargazers_count}`;
          listItem.appendChild(liText);

          const imgClose = document.createElement("div");
          imgClose.classList.add("close");
          listItem.appendChild(imgClose);

          const imgClose1 = document.createElement("img");
          imgClose1.classList.add("close1");
          imgClose1.src = "./x/cross.svg";
          imgClose.appendChild(imgClose1);

          const imgClose2 = document.createElement("img");
          imgClose2.classList.add("close2");
          imgClose2.src = "./x/cross.svg";
          imgClose.appendChild(imgClose2);

          imgClose.addEventListener("click", function () {
            listItem.classList.add("list-item-none");
          });
        });
      });
    }
  } else {
    list.innerHTML = " ";
  }
};

const debounce = (fn, debounceTime) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, debounceTime);
  };
};

input.addEventListener("keyup", debounce(searchRepositories, 500));
