//your code here
document.addEventListener("DOMContentLoaded", function () {
  const imagesContainer = document.getElementById("images-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");
  const h = document.getElementById("h");

  let state = 1;
  let clickedImages = [];

  // Function to shuffle array elements
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to render images
  function renderImages() {
    const imgClasses = ["img1", "img2", "img3", "img4", "img5"];

    // Duplicate one class randomly
    const duplicateClass = imgClasses[Math.floor(Math.random() * imgClasses.length)];
    imgClasses.push(duplicateClass);

    shuffleArray(imgClasses);

    imagesContainer.innerHTML = "";
    imgClasses.forEach((imgClass, index) => {
      const img = document.createElement("img");
      img.src = `https://picsum.photos/200/300?random=${index}`;
      img.classList.add(imgClass);
      img.addEventListener("click", () => handleImageClick(imgClass));
      imagesContainer.appendChild(img);
    });
  }

  // Function to handle image click
  function handleImageClick(imgClass) {
    if (clickedImages.length < 2) {
      clickedImages.push(imgClass);
      document.querySelector(`.${imgClass}`).classList.add("selected");
    }

    if (clickedImages.length === 2) {
      verifyButton.style.display = "block";
    }

    if (clickedImages.length > 2) {
      resetButton.style.display = "none";
    }
  }

  // Function to reset state and clear clicked images
  function resetState() {
    clickedImages = [];
    document.querySelectorAll("img").forEach((img) => img.classList.remove("selected"));
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
  }

  // Function to handle verify button click
  function handleVerifyClick() {
    if (clickedImages[0] === clickedImages[1]) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyButton.style.display = "none";
    resetButton.style.display = "block";
  }

  // Event listeners
  resetButton.addEventListener("click", resetState);
  verifyButton.addEventListener("click", handleVerifyClick);

  // Initial render
  renderImages();
});
