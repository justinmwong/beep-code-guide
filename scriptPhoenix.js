// Function to handle the scroll event
const handleScroll = () => {
  const cards = document.querySelectorAll(".custom-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("fade-in");
    }, index * 200); // Adjust the delay time (in milliseconds) between each card
  });
};

const getAirtableData = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer /* Insert token here */`,
    },
  };

  let allRecords = []; // Array to store all records
  let offset = null; // Initial offset value

  try {
    // Fetch records recursively until no more records are returned
    while (true) {
      let url = `/* Insert API here */`;
      if (offset) {
        url += `?offset=${offset}`;
      }

      const response = await fetch(url, options);
      const data = await response.json();

      // Add current page records to the allRecords array
      allRecords.push(...data.records);

      // If there are more records, update offset and continue fetching
      if (data.offset) {
        offset = data.offset;
      } else {
        // No more records, break the loop
        break;
      }
    }

    // Process allRecords array
    let phoenixContent = "";
    for (let i = 0; i < allRecords.length; i++) {
      const record = allRecords[i].fields || {};
      let howToFixContent = "";

      if (record.howtofix && record.howtofix !== "N/A") {
        // If "howtofix" is not "N/A" and exists
        const howToFixLinks = record.howtofix.split(","); // Split links if there are multiple
        howToFixContent += '<p class="card-text">Potential fixes:<br>';
        howToFixLinks.forEach((link) => {
          howToFixContent += `<a href="${link.trim()}" target="_blank">${link.trim()}</a><br>`; // Generate link HTML for each link
        });
        howToFixContent += "</p>";
      } else {
        howToFixContent = "Potential fixes: <br> N/A";
      }

      phoenixContent += `        
    <div class="card custom-card">
      <div class="card-body">
        <h5 class="card-title">${record.beepcode || "N/A"}</h5>
        <p class="card-text">Description: <br> ${
          record.description || "N/A"
        }</p>
        <p class="card-text">Should I worry? <br> ${
          record.shouldiworry || "N/A"
        }</p>
        ${howToFixContent}
      </div>
    </div>`;
    }

    // Display processed content
    let phoenix = document.getElementById(`phoenix`);
    phoenix.innerHTML = phoenixContent;
    // Call handleScroll after a short delay to load cards one by one
    setTimeout(() => {
      handleScroll();
    }, 500); // Adjust the delay time (in milliseconds) before loading the first card
  } catch (error) {
    console.log(error);
  }
};

getAirtableData();
