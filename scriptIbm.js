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
    const ibmResponse = await fetch(
      "/* Insert API here */",
      options
    );
    const ibmData = await ibmResponse.json();
    console.log(ibmData);

    let ibmContent = "";
    const records = ibmData.records || [];

    for (let i = 0; i < records.length; i++) {
      const record = records[i].fields || {};

      // Check if "Potential fixes" is not equal to "N/A"
      if (record.howtofix !== "N/A") {
        ibmContent += `
          <div class="card custom-card">
            <div class="card-body">
              <h5 class="card-title">${record.beepcode}</h5>
              <p class="card-text">Description: <br> ${record.description}</p>
              <p class="card-text">Should I worry? <br> ${record.shouldiworry}</p>
              <p class="card-text">Potential fixes: <br> <a href ="${record.howtofix}" target = "_blank">${record.howtofix}</a></p> <!-- Include the link HTML here -->
            </div>
          </div>
        `;
      } else {
        // If "Potential fixes" is "N/A", don't include the link
        ibmContent += `
          <div class="card custom-card">
            <div class="card-body">
              <h5 class="card-title">${record.beepcode}</h5>
              <p class="card-text">Description: <br> ${record.description}</p>
              <p class="card-text">Should I worry? <br> ${record.shouldiworry}</p>
              <p class="card-text">Potential fixes: <br> ${record.howtofix}</p>
            </div>
          </div>
        `;
      }
    }

    let ibm = document.getElementById("ibm");
    if (ibm) {
      ibm.innerHTML = ibmContent;
      // Call handleScroll after a short delay to load cards one by one
      setTimeout(() => {
        handleScroll();
      }, 500); // Adjust the delay time (in milliseconds) before loading the first card
    } else {
      console.error("Element with id 'ibm' not found.");
    }
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
  }
};

getAirtableData();
