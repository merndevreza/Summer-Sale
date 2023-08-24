"use strict";
// Accessing elements
//card
const productCards = document.getElementsByClassName("products-card");
const productTitle = document.getElementsByClassName("product-title");
//coupon
const promoCode = document.getElementById("promo-code");
const couponField = document.getElementById("coupon-field");
const couponBtn = document.getElementById("coupon-btn");
//cart
const selectedProductsContainer = document.getElementById("cart-product-names");
let totalAmount = document.getElementById("total-amount");
let discountAmount = document.getElementById("discount-amount");
let totalAmountFinal = document.getElementById("total-final");
const buyNowBtn = document.getElementById("purchase-btn");

const popupResetBtn = document.getElementById("reset-btn");
const minPurchaseForDiscount = 200;
const discountRate = 0.2; //20% discount
// addToCart event
function addToCart(event) {
  // ProductName
  // let selectedProductName = event.childNodes[3].childNodes[3].innerText;
  let selectedProductName = event.querySelector(".product-title").innerText;
  const li = document.createElement("li");
  li.classList.add("li-items");
  li.innerText = selectedProductName;
  selectedProductsContainer.appendChild(li);
  // total-price
  // let productPrice = event.childNodes[3].childNodes[5].childNodes[0].innerText;
  let productPrice = event.querySelector(".price-amount").innerText;
  let totalCalculated =
    parseFloat(totalAmount.innerText) + parseFloat(productPrice);
  totalAmount.innerText = totalCalculated.toFixed(2);
  if (parseFloat(totalAmount.innerText) >= minPurchaseForDiscount) {
    couponBtn.removeAttribute("disabled");
  }
  if (parseFloat(totalAmount.innerText) > 0) {
    buyNowBtn.removeAttribute("disabled");
  }
}

// coupon event
couponBtn.addEventListener("click", function () {
  if (couponField.value === promoCode.innerText) {
    let discountedCalculated = parseFloat(totalAmount.innerText) * discountRate;
    discountAmount.innerText = discountedCalculated.toFixed(2);

    let totalAmountFinalCalculated =
      parseFloat(totalAmount.innerText) - parseFloat(discountAmount.innerText);
    totalAmountFinal.innerText = totalAmountFinalCalculated.toFixed(2);

    couponField.value = "";
  } else {
    alert("Your coupon didn't match");
    couponField.value = "";
  }
});

// Make purchase event
buyNowBtn.addEventListener("click", function () {
  document.getElementById("popup").classList.add("active");
  document.getElementById("overlay").classList.add("active");
});
// popupResetBtn -- Go home
popupResetBtn.addEventListener("click", function () {
  document.getElementById("popup").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  // removing selected products
  const lis = document.querySelectorAll(".li-items");
  for (const li of lis) {
    selectedProductsContainer.removeChild(li);
  }
  // reset all prices
  let resetAmount = "0.00";
  totalAmount.innerText = resetAmount;
  discountAmount.innerText = resetAmount;
  totalAmountFinal.innerText = resetAmount;
  // disable buttons
  // couponBtn.setAttribute("disabled", true);
  // buyNowBtn.setAttribute("disabled", true);
  couponBtn.disabled = true; // to disable
  buyNowBtn.disabled = true; // to disable
});
