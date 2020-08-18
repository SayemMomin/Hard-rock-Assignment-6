const searchButton = document.getElementById('searchButton');
searchButton.addEventListener("click", function(){
    const songName = document.getElementById('songName').value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => showSearchResult(data))
})

function showSearchResult(data){
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = "";
    searchResult.classList.add("search-result", "col-md-8", "mx-auto", "py-4")
    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        const title = element.title;
        const artist = element.artist.name;
        const child = ` <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name text-center"> <span>${title}</span>.</h3>
                                <p class="author lead ">Album by <span>${artist}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyrics('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>`;
        searchResult.innerHTML += child;
       
        
    }
    
}





//event listener in get lyrics button

function getLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => showLyrics(data, title))
    
}

function showLyrics(data, title) {
    if (data.lyrics === undefined) {
        document.getElementById('searchResult').innerHTML = 
            ".............nothing............."
    } else {
        document.getElementById('searchResult').innerHTML = 
        `<h2 class="text-success mb-4">Title - ${title}</h2>
        <pre class ="lyrics text-white">
        ${data.lyrics}
        </pre>`
    }
}