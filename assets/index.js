const mainImageSize = () => {
    const changeImgSize = (selector) => {
        const items = document.querySelectorAll(selector);

        if (items.length !== 0) {
            items.forEach(item => {
                const img = item.querySelector("img");
                const width = img.width;
                img.style.minHeight = width + "px";
                img.style.maxHeight = width + "px";
            });
        }
    };

    const catalogListSelector = ".catalog__list > li";

    changeImgSize(catalogListSelector);

    window.addEventListener("resize", () => {
        changeImgSize(catalogListSelector);
    });
};

const mainCart = () => {
    const cartDrawer = document.querySelector(".cart-drawer");
    const cartDrawerOpeners = document.querySelectorAll(".cart-drawer-opener");

    const openCartDrawer = () => {
        document.body.style.overflow = "hidden";
        cartDrawer.classList.add("opened");
    };

    const closeCartDrawer = () => {
        document.body.style.overflow = "";
        cartDrawer.classList.remove("opened");
    };

    cartDrawerOpeners.forEach(btn => {
       btn.addEventListener("click", async (e) => {
           e.preventDefault();
           openCartDrawer();
       });
    });

    cartDrawer.addEventListener("click", (e) => {
        const isOverlay = e.target.classList.contains("cart-drawer");
        const isCloseButton = e.target.id === "cart-drawer-close";

        if (isOverlay || isCloseButton) {
            closeCartDrawer();
        }
    });

    const updateCartCounter = (cart) => {
        const cartCounters = document.querySelectorAll(".cart-counter");

        cartCounters.forEach(counter => {
            counter.textContent = cart.item_count;
        });
    };

    const addCartDrawerListeners = () => {
        const listItems = cartDrawer.querySelectorAll(".cart-drawer__preview");

        listItems.forEach(item => {
            const key = item.dataset.itemKey;

            const deleteBtn = item.querySelector(".cart-drawer-delete");

            const stepper = item.querySelector(".stepper");
            const increment = item.querySelector(".increment");
            const decrement = item.querySelector(".decrement");
            const stepperInput = stepper.querySelector("input");
            const quantity = Number(stepperInput.value);

            const updateQuantity = async (newQuantity) => {
                const res = await fetch("/cart/update.js", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({updates: {[key]: newQuantity}})
                });

                return await res.json();
            };

            const changeQuantity = async (quantity) => {
                const cartDrawer = document.querySelector(".cart-drawer");
                const cartDrawerLoader = cartDrawer.querySelector(".loader");

                cartDrawerLoader.classList.add("isVisible");

                const cart = await updateQuantity(quantity);
                await updateCartDrawer();

                cartDrawerLoader.classList.remove("isVisible");

                updateCartCounter(cart);
            };

            deleteBtn.addEventListener("click", () => {
                changeQuantity(0);
            });

            increment.addEventListener("click", () => {
                changeQuantity(quantity + 1);
            });

            decrement.addEventListener("click", async () => {
                changeQuantity(quantity - 1);
            });
        });
    };

    const updateCartDrawer = async () => {
        const res = await fetch("/?section_id=cart-drawer");
        const text = await res.text();

        const html = document.createElement("div");
        html.innerHTML = text;

        cartDrawer.innerHTML = html.querySelector(".cart-drawer").innerHTML;

        addCartDrawerListeners();
    };

    const addItemToCart = async (form) => {
        const cartDrawer = document.querySelector(".cart-drawer");
        const cartDrawerLoader = cartDrawer.querySelector(".loader");

        cartDrawerLoader.classList.add("isVisible");

        await fetch("/cart/add", {
            method: "POST",
            body: new FormData(form),
        });

        const res = await fetch("/cart.json");
        const cart = await res.json();

        updateCartCounter(cart);

        await updateCartDrawer();

        cartDrawerLoader.classList.remove("isVisible");
    };

    addCartDrawerListeners();

    const formsCartAdd = document.querySelectorAll("form[action='/cart/add']");

    if (formsCartAdd.length !== 0) {
        formsCartAdd.forEach(form => {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                openCartDrawer();
                await addItemToCart(form);
            });
        });
    }
};

mainCart();
mainImageSize();
