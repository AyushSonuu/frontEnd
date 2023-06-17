let ele = document.getElementById("imagee");
let img = document.getElementsByClassName("targetSpecific");
let mainImg = document.getElementById("targetImg");
let prodTitle = document.getElementById("productName");
let titleTag = document.getElementById("productName");
let categoryTag = document.getElementById("category");
let rateTag = document.getElementById("rate");
let countTag = document.getElementById("count");
let dots = document.getElementById("dots");
let moreText = document.getElementById("more");
let btnText = document.getElementById("myBtn");
let mainDesc = document.getElementById("mainDesc");
let price = document.getElementById("price");
let src;
let productImage = (src) => {
    let template = `<div class="container flex justify-center  p-2">
    <img id=${src.id} class="h-[100px] targetSpecific rounded hover:cursor-pointer" src="${src.image}" alt="">
    </div>`;
    ele.innerHTML = ele.innerHTML + template;
    let element = document.getElementById(src.id);
    element.dataset.title = src.title;
    element.dataset.price = src.price;
    element.dataset.description = src.description;
    element.dataset.category = src.category;
    element.dataset.image = src.image;
    element.dataset.rate = src.rate;
    element.dataset.count = src.count;
    console.log(element)
}



let fetchProductData = async () => {
    try {
        const response = await fetch("http://localhost:8080/products");
        let src = await response.json();
        return src;
    } catch (error) {
        console.log("Error:", error);
        return [];
    }
}

btnText.addEventListener('click', () => {


    if (dots.getAttribute('class') === 'inline') {
        dots.setAttribute("class", "hidden");
        btnText.innerHTML = "Read less";
        moreText.setAttribute('class', 'inline');
    } else {
        dots.setAttribute("class", "inline");
        btnText.innerHTML = "Read More";
        moreText.setAttribute('class', 'hidden');
    }
})
async function renderPage() {
    src = await fetchProductData();
    if (src.length > 0) {

        mainImg.setAttribute("src", src[0].image);
        prodTitle.textContent = src[0].title;

        categoryTag.innerHTML = "Category : " + src[0].category;
        rateTag.innerHTML = "Rating   : " + src[0].rate;
        countTag.innerHTML = "Reviews  : " + src[0].count;
        let zerothDesc = src[0].description.split(" ")
        mainDesc.innerHTML = zerothDesc.slice(0, 18).join(" ");
        moreText.innerHTML = zerothDesc.slice(18, zerothDesc.length).join(" ")
        dots.setAttribute("class", "inline");
        moreText.setAttribute('class', 'hidden');
        price.innerHTML = 'BUY NOW ' + `$ ${src[0].price}`

        src.forEach((element) => {
            productImage(element);

        });



        Array.from(img).forEach(element => {
            element.addEventListener("click", handleImageClick);
        });

    }
}

const handleImageClick = (event) => {
    const imageLink = event.target.getAttribute("src");
    const id = event.target.getAttribute('id');
    mainImg.setAttribute("src", imageLink)
    // console.log(imageLink, id);
    let title = event.target.dataset.title
    let price = event.target.dataset.price
    let category = event.target.dataset.category
    let description = event.target.dataset.description
    let rate = event.target.dataset.rate
    let count = event.target.dataset.count
    titleTag.innerHTML = (title.split(" ").slice(0, 7)).join(" ");
    categoryTag.innerHTML = "Category : " + category;
    rateTag.innerHTML = "Rating   : " + rate
    countTag.innerHTML = "Reviews  : " + count
    price.innerHTML = 'BUY NOW ' + `$ ${price}`
    let descArr = description.split(" ");
    mainDesc.innerHTML = descArr.slice(0, 18).join(" ");
    moreText.innerHTML = descArr.slice(18, descArr.length).join(" ")

    dots.setAttribute("class", "inline");
    moreText.setAttribute('class', 'hidden');
}




renderPage();


