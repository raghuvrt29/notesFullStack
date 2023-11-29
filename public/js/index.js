const delnote = (e) => {
    e.preventDefault();
    const noteURL=e.target.parentElement.parentElement.firstElementChild.href;
    console.log(noteURL);
    try{
        fetch(noteURL,{
            method:"DELETE"
        })
    }
    catch(err){
        console.log(err);
    }
}