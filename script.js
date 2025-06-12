function search(){
    //søkefunksjon her!!!
}

let modalOpen = false
function modalFunc(){
    //funksjon som åpner produktsidene
    // let modalbox = document.getElementById("modalbox");
    //modalbox.style.display = "inline";
    document.body.style.overflow = 'hidden';
    document.body.innerHTML += `    
        <div id="modalbox" class="fixed flex w-screen h-screen align-middle justify-center">
            <div id="modal" class="flex flex-col bg-white md:border-2 md:rounded-4xl w-max-screen m-min-120 md:ml-30 md:mr-30 h-screen md:h-fit mt-20 p-8">
                <h1 class="text-7xl mb-8">Akustisk gitar</h1>
                <div class="flex flex-row justify-between">
                    <img class=" border-[1.5px] rounded-2xl w-2/5" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-W0U7nDQT-38%2FTwxzvKZKdQI%2FAAAAAAAAEDA%2F7YBXwMr9gec%2Fs1600%2Fgitar%2B2012.jpg&f=1&nofb=1&ipt=30a2f40a6e592739acf60541dd9f7383c8d0691dc90e66d28dbaee87ccea6a8c">
                    <div class="flex flex-col w-5/10">
                        <h2 class="text-4xl">pris</h2>
                        <p>kategori</p>
                        <p>beskrivelse</p>
                        <button onclick="handlekurvFunc()" class="border-1 rounded-4xl max-w-80">legg til i handlekurv</button>
                    </div>
                </div>
            </div>
        </div>
        `
    modalOpen = true
}
window.onclick = function(event) {
    console.log('hei')
    let modal = document.getElementById("modal");
    let modalbox = document.getElementById("modalbox");
    if (modalOpen==true){
        console.log('hei2')
        if (event.target != modal) {
            console.log('hei3')
            //modalbox.style.display = "none";
        }
    }
}

function handlekurvFunc(){ //funksjon som kjører når brukeren trykker på legg til i handlekurven

}