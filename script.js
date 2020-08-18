const searchButton = document.getElementById('searchButton');
searchButton.addEventListener("click", function(){
    const songName = document.getElementById('songName').value;
    // console.log(songName);
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
        const title = element.album.title;
        const artist = element.artist.name;
        // let artist = artist.name;
        // let title = album.title;
        const child = ` <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name"> <span data-title>${title}</span>.</h3>
                                <p class="author lead">Album by <span data-artist>${artist}</span></p>
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
    //.catch((error) => alert('error'))
    
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







// searchButton.addEventListener('click', e=>{
//     const clickedElement = e.target;

//     //checking clicked elemet is button or not
//     if (clickedElement.tagName === 'SPAN'){
//         const artist = clickedElement.getAttribute('data-artist');
//         const title = clickedElement.getAttribute('data-title');
        
//         getLyrics(artist, title)
//     }
// })

// // Get lyrics for song
// async function getLyrics(artist, title) {
  
//     const res = await fetch(`https://api.lyrics.ovh/v1/${title}/${artist}`)

//     const data = await res.json();
//     const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
//     searchResult.innerHTML = ` 
//     <strong>${artist}</strong> - ${title}
//     <div data-artist="${artist}" data-title="${title}"> get lyrics</div>
//     <p>${lyrics}</p>
// `    
    
// }