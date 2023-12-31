// Setup drop-down css
const styles = `
    .drop-down {
        position: relative;
        width: fit-content;
    }

    .drop-down .items {
        margin: 0;
        padding: 0;
        list-style-type: none;
        left: 0;
        top: 100%;
        border: 1px solid gray;
    }

    .drop-down .items .item {
        background-color: whitesmoke;
        padding: 2px;
    }

    .drop-down .items .item:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }

    .drop-down .items .item:active {
        filter: brightness(0.7);
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Setup drop-downs js
(function () {
    const dropDowns = document.querySelectorAll(".drop-down");

    dropDowns.forEach((dropDown) => {
        const button = dropDown.querySelector(".trigger");
        const list = dropDown.querySelector(".items");
        let active = false;

        function changeActive() {
            if (active) {
                list.classList.remove("active");
                list.style.display = "none";
            } else {
                list.classList.add("active");
                list.style.display = "initial";
            }

            active = !active;
        }

        function determineWidth() {
            let maxElement = 0;
            const children = Array.from(list.children);
            children.forEach((child) => {
                maxElement = Math.max(maxElement, Number(child.offsetWidth));

                child.addEventListener("click", () => {
                    changeActive();
                });
            });
            list.style.minWidth = `${maxElement + 2}px`;
            list.style.position = "absolute";
            list.style.display = "none";
        }

        button.addEventListener("click", () => {
            changeActive();
        });

        window.addEventListener("click", (event) => {
            if (active && !event.target.matches(".drop-down, .drop-down *")) {
                changeActive();
            }
        });

        determineWidth();
    });
})();

// Interact with drop-downs
export default function (query) {
    const dropDown = document.querySelector(query);
    if (!dropDown.classList.contains("drop-down")) {
        return null;
    }

    let onselect = function (item) {};

    const list = dropDown.querySelector(".items");
    const children = Array.from(list.children);
    children.forEach((child) => {
        child.addEventListener("click", () => {
            onselect(child);
        });
    });

    function subscribe(func) {
        onselect = func;
    }

    return { subscribe };
}
