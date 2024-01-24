async function fetchJsonData() {
    try {
        const response = await fetch('Materials.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

async function searchTextures() {
    const jsonData = await fetchJsonData();
    if (!jsonData) {
        console.error('No JSON data available');
        return;
    }
    const selectedTextures = Array.from(document.querySelectorAll('input[name="texture"]:checked')).map(el => el.value);
    const isRestricted = document.getElementById('restrictedSearch').checked;
    const skinCountEnabled = document.getElementById('skinCountToggle').checked;
    const selectedSkinCount = parseInt(document.getElementById('skinCount').value);

    console.log("Selected Textures: ", selectedTextures);
    console.log("Is Restricted: ", isRestricted);
    console.log("Skin Count Enabled: ", skinCountEnabled);
    console.log("Selected Skin Count: ", selectedSkinCount);

    let results = [];

    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            let materials = jsonData[key].Materials;

            console.log("Processing key: ", key);
            console.log("Materials: ", materials);

            let match = materials.filter(material => {
                let textures = Object.keys(material).filter(k => k !== "Possible Skin Counts").map(k => material[k]).flat();
                
                console.log("Textures: ", textures);

                let textureMatch = selectedTextures.every(t => textures.includes(t));
                let skinCountMatch = !skinCountEnabled || (material['Possible Skin Counts'].includes(selectedSkinCount));

                console.log("Texture Match: ", textureMatch);
                console.log("Skin Count Match: ", skinCountMatch);

                if (isRestricted) {
                    return textureMatch && skinCountMatch && textures.every(t => selectedTextures.includes(t.split('.')[0]));
                }
                return textureMatch && skinCountMatch;
            });

            if (match.length > 0) {
                results.push({ key, match });
            }
        }
    }

    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No matches found.</p>';
        return;
    }

    results.forEach(item => {
        let div = document.createElement('div');
        div.innerHTML = `<strong>${item.key}</strong>: ${JSON.stringify(item.match)}`;
        resultsDiv.appendChild(div);
    });
}

function toggleSkinCountMenu() {
    const skinCountMenu = document.getElementById('skinCountMenu');
    skinCountMenu.style.display = document.getElementById('skinCountToggle').checked ? 'block' : 'none';
}

function changeSkinCount(change) {
    const skinCountInput = document.getElementById('skinCount');
    let currentCount = parseInt(skinCountInput.value);
    currentCount = Math.min(Math.max(currentCount + change, 0), 8);
    skinCountInput.value = currentCount;
}
