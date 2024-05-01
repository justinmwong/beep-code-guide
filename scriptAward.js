// Function to handle the scroll event
const handleScroll = () => {
  const cards = document.querySelectorAll('.custom-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('fade-in');
    }, index * 200); // Adjust the delay time (in milliseconds) between each card
  });
};

const getAirtableData = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer /* Insert token here */ ",
    },
  };

  try {
    const awardResponse = await fetch(
      "/* Insert API here */",
      options
    );
    const awardData = await awardResponse.json();
    console.log(awardData);

    let awardContent = "";
    const records = awardData.records || [];

    for (let i = 0; i < records.length; i++) {
      const record = records[i].fields || {};
      awardContent += `
        <div class="card custom-card">
          <div class="card-body">
            <h5 class="card-title">${record.beepcode}</h5>
            <p class="card-text">Description: <br> ${record.description}</p>
            <p class="card-text">Should I worry? <br> ${record.shouldiworry}</p>
            <p class="card-text">Potential fixes: <br> <a href ="${record.howtofix}" target = "_blank">${record.howtofix}</a></p> <!-- Include the link HTML here -->
          </div>
        </div>
      `;
    }

    let award = document.getElementById("award");
    if (award) {
      award.innerHTML = awardContent;
      // Call handleScroll after a short delay to load cards one by one
      setTimeout(() => {
        handleScroll();
      }, 500); // Adjust the delay time (in milliseconds) before loading the first card
    } else {
      console.error("Element with id 'award' not found.");
    }
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
  }
};

getAirtableData();
