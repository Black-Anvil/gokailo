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
    const blogListSelector = ".blog__list > li";
    const productImageSelector = ".product__images > li";
    const productSlideSelector = ".product__swiper .swiper-slide";
    const pageCollectionSelector = ".shop-category__swiper .swiper-slide";
    const pageSearchSelector = ".search-page__list > li";

    const initImagesChanger = () => {
        changeImgSize(catalogListSelector);
        changeImgSize(productImageSelector);
        changeImgSize(pageCollectionSelector);
        changeImgSize(blogListSelector);
        changeImgSize(pageSearchSelector);
        changeImgSize(productSlideSelector);
    };

    initImagesChanger();

    document.addEventListener("shopify:section:load", initImagesChanger);

    window.addEventListener("resize", initImagesChanger);
};

mainImageSize();

const updateCartCounter = (cart) => {
    const cartCounters = document.querySelectorAll(".cart-counter");

    cartCounters.forEach(counter => {
        counter.textContent = cart.item_count;
    });
};

$(document).ready(function () {
    $('.popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
});

const initAccordion = () => {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(accordion => {
        const btn = accordion.querySelector(".accordion__header");

        btn.addEventListener("click", () => {
            accordions.forEach(item => {
                if (accordion !== item) {
                    item.classList.remove("opened");
                }
            });

            accordion.classList.toggle("opened");
        });
    });
};

document.addEventListener("shopify:section:load", initAccordion);

initAccordion();


