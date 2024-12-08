
const accessKey='DnW8j5ufHP43lflTKi0-wz8Xu4RVHqtOr3qNr1-nyds';
const searchForm=document.querySelector('form')
const searchInput=document.querySelector('.search-input');
const imagesContainer=document.querySelector('.images-container')
const loadMoreBtn=document.querySelector('.loadMoreBtn');

let page=1;
const fetchImages= async(query, pageNo)=>{
    try{

    
    if(pageNo===1){
    imagesContainer.innerHTML='';
    }
    const url=`https://api.unsplash.com/search/photos/?query=${query}
    &per_page=20 &page=${pageNo} &client_id=${accessKey}`;

    const response=await fetch(url);
    const data=await response.json();
    
   if(data.results.length>0){
    data.results.forEach(photo=>{
        const imageElement=document.createElement('div');
        imageElement.classList.add('imageDiv');
        
        imageElement.innerHTML=`<img src="${photo.urls.regular}">`;

        //creating overlay
        const overlayElement=document.createElement('div');
        overlayElement.classList.add('overlay');
        
        //overlaytext
        const overlayText=document.createElement('h3');
        overlayElement.innerText=`${photo.alt_description}`;
        overlayElement.appendChild(overlayText);

        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
    })
    if(data.total_pages===pageNo){
        loadMoreBtn.Style.display="none";
    }
    else{
        loadMoreBtn.style.display="block";
    }
}
else{
    imagesContainer.innerHTML=`<h2>No Image Found.</h2>`
}
}
catch(error){
    imagesContainer.innerHTML=`<h2>Failed to fetch Images.</h2>`
}
}
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputText=searchInput.value.trim();
    if(inputText!==''){
        page=1;
        fetchImages(inputText, page);
    }
    else{
        imagesContainer.innerHTML=`<h2>Please enter a search query</h2>`
        if(loadMoreBtn.style.display==="block"){
            loadMoreBtn.style.display==="none";
        }
    }
});
//adding event listener to load more btn
loadMoreBtn.addEventListener('click',()=>{
    fetchImages(searchInput.value.trim(),++page);
})
