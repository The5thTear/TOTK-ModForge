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

    let results = [];

    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            let materials = jsonData[key].Materials;
            
            let match = materials.filter(material => {
                let materialTextures = Object.keys(material).filter(k => k !== "Possible Skin Counts").map(k => material[k]).flat();
                let skinCountMatch = !skinCountEnabled || (material['Possible Skin Counts'].includes(selectedSkinCount));

                // Check if all selected textures are in the material textures
                const allSelectedPresent = selectedTextures.every(st => 
                    materialTextures.some(mt => mt.includes(st))
                );

                // Non-Restricted Search: The material must contain all selected textures but can also have others.
                if (!isRestricted) {
                    return skinCountMatch && allSelectedPresent;
                }

                // Restricted Search: The material must contain only and all of the selected textures.
                // Check if material textures don't have extra textures not included in selected textures
                const noExtraTextures = materialTextures.every(mt => 
                    selectedTextures.some(st => mt.includes(st))
                );

                // Both conditions must be met for a match in Restricted Search
                return skinCountMatch && allSelectedPresent && noExtraTextures;
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
        item.match.forEach(material => {
            let materialName = Object.keys(material)[0]; // e.g., "Mt_Body"
            let textures = material[materialName]; // array of texture names

            let materialDiv = document.createElement('div');
            materialDiv.classList.add('material-div');
            materialDiv.innerHTML = `<strong>${materialName}</strong> - ${item.key}<br><span class="material-textures">Material Textures:</span>`;

            let ul = document.createElement('ul');
            textures.forEach(texture => {
                let li = document.createElement('li');
                li.textContent = `${texture} (${getTextureType(texture)})`;
                // Add a class for the texture type to the list item
                li.classList.add(getTextureTypeClass(texture));
                ul.appendChild(li); // Append the list item to the unordered list
            });
            materialDiv.appendChild(ul); // Append the unordered list to the material div
            resultsDiv.appendChild(materialDiv); // Append the material div to the results div
        });
    });
}

function getTextureType(textureName) {
    if (textureName.includes('Alb')) return 'Albedo Texture (Color)';
    if (textureName.includes('Nrm')) return 'Normal Map';
    if (textureName.includes('Spm')) return 'Specular Map';
    if (textureName.includes('Emm')) return 'Emission Texture';
    if (textureName.includes('Emc')) return 'Emission Color';
    if (textureName.includes('EmmMsk')) return 'Emission Mask';
    // Add more conditions for other texture types
    return 'Unknown Type';
}

function getTextureTypeClass(textureName) {
    // Returns a class name based on the texture type
    if (textureName.includes('Alb')) return 'Alb-color';
    if (textureName.includes('Nrm')) return 'Nrm-color';
    if (textureName.includes('Spm')) return 'Spm-color';
    if (textureName.includes('Emm')) return 'Emm-color';
    if (textureName.includes('Emc')) return 'Emc-color';
    if (textureName.includes('EmmMsk')) return 'EmmMsk-color';
    // Add more conditions for other texture types
    return 'unknown-type';
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

document.addEventListener('DOMContentLoaded', (event) => {
    // Attach change event listener to the skin count toggle
    document.getElementById('skinCountToggle').addEventListener('change', function() {
        // Get the skin count select element
        const skinCountSelect = document.getElementById('skinCount');
        
        // Check if the toggle is checked
        if (this.checked) {
            // Show the skin count selector
            skinCountSelect.style.display = 'block';
        } else {
            // Hide the skin count selector
            skinCountSelect.style.display = 'none';
        }
    });
});
