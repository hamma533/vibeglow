downloadBtn.addEventListener('click', () => {
    html2canvas(previewBox).then(canvas => {
        const link = document.createElement('a');
        link.download = 'affirmation.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        console.error("Error capturing the image:", err);
    });
});
const moodSelect = document.getElementById('mood-select');
const subOptionsContainer = document.getElementById('sub-options-container');
const subOptionSelect = document.getElementById('sub-option-select');
const moodResult = document.getElementById('mood-result');
const moodRecommendations = document.getElementById('mood-recommendations');

// Mapping moods to sub-options and playlists
const moodData = {
    happy: {
        options: ["Energetic", "Relaxed", "Excited"],
        playlists: {
            Energetic: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
            Relaxed: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
            Excited: "https://open.spotify.com/playlist/37i9dQZF1DWZq91oRsNs1r"
        }
    },
    sad: {
        options: ["Reflective", "Comforting", "Melancholic"],
        playlists: {
            Reflective: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",
            Comforting: "https://open.spotify.com/playlist/37i9dQZF1DX4OzrY981I1W",
            Melancholic: "https://open.spotify.com/playlist/37i9dQZF1DWVw7c2MHvocy"
        }
    },
    calm: {
        options: ["Peaceful", "Meditative", "Content"],
        playlists: {
            Peaceful: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
            Meditative: "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u",
            Content: "https://open.spotify.com/playlist/37i9dQZF1DX6VdMW310YC7"
        }
    },
    motivated: {
        options: ["Driven", "Focused", "Creative"],
        playlists: {
            Driven: "https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6",
            Focused: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
            Creative: "https://open.spotify.com/playlist/37i9dQZF1DWXLeA8Omikj7"
        }
    },
    romantic: {
        options: ["Dreamy", "Passionate", "Nostalgic"],
        playlists: {
            Dreamy: "https://open.spotify.com/playlist/37i9dQZF1DX82Zzp6AKx64",
            Passionate: "https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn",
            Nostalgic: "https://open.spotify.com/playlist/37i9dQZF1DWVkKds2aOkxu"
        }
    }
};

// Populate sub-options based on mood
moodSelect.addEventListener('change', () => {
    const selectedMood = moodSelect.value;
    moodResult.textContent = ""; // Clear previous mood result
    moodRecommendations.innerHTML = ""; // Clear recommendations

    if (selectedMood) {
        const options = moodData[selectedMood].options;

        // Show sub-options dropdown
        subOptionsContainer.style.display = 'block';

        // Populate sub-options dropdown
        subOptionSelect.innerHTML = '<option value="">-- Select Option --</option>';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            subOptionSelect.appendChild(optionElement);
        });
    } else {
        subOptionsContainer.style.display = 'none';
    }
});

// Update recommendations based on sub-option
subOptionSelect.addEventListener('change', () => {
    const selectedMood = moodSelect.value;
    const selectedOption = subOptionSelect.value;

    if (selectedOption) {
        const playlistLink = moodData[selectedMood].playlists[selectedOption];

        moodResult.textContent = `You're feeling ${selectedMood} - ${selectedOption}!`;
        moodRecommendations.innerHTML = `
            <p>We recommend this playlist for your mood:</p>
            <a class="playlist-link" href="${playlistLink}" target="_blank">Open Playlist on Spotify</a>
        `;
    } else {
        moodResult.textContent = "";
        moodRecommendations.innerHTML = "";
    }
});

