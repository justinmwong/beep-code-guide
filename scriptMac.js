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
      Authorization: "Bearer /* Insert token here */",
    },
  };

  try {
    const macResponse = await fetch(
      "/* Insert API here */",
      options
    );
    const macData = await macResponse.json();
    console.log(macData);

    let macContent = "";
    const records = macData.records || [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i].fields || {};
    let linksHTML = "";
    if (record.howtofix) {
      const links = record.howtofix.split(','); // Assuming links are separated by commas
      links.forEach(link => {
        linksHTML += `<a href="${link.trim()}" target="_blank">${link.trim()}</a><br>`;
      });
    }

    macContent += `
      <div class="card custom-card">
        <div class="card-body">
          <h5 class="card-title">${record.beepcode}</h5>
          <p class="card-text">Description: <br>${record.description}</p>
          <p class="card-text">Should I worry? <br>${record.shouldiworry}</p>
          <p class="card-text">Potential fixes: <br>${linksHTML}</p>
        </div>
      </div>
    `;
  }

    let mac = document.getElementById("mac");
    if (mac) {
      mac.innerHTML = macContent;
      // Call handleScroll after a short delay to load cards one by one
      setTimeout(() => {
        handleScroll();
      }, 500); // Adjust the delay time (in milliseconds) before loading the first card
    } else {
      console.error("Element with id 'mac' not found.");
    }
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
  }
};

getAirtableData();
